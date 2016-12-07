import { expect } from 'chai';
import { eduBenefits as schema } from '../../dist/schemas';
import Ajv from 'ajv';
import _ from 'lodash';

describe('education benefits json schema', () => {
  let ajv = new Ajv();
  let currentSchema;
  const validateSchema = (data) => {
    return ajv.validate(currentSchema, data);
  };
  const validators = {
    valid: (data) => {
      expect(validateSchema(data)).to.equal(true);
    },
    invalid: (data) => {
      expect(validateSchema(data)).to.equal(false);
      expect(ajv.errors[0].dataPath).to.contain(`.${Object.keys(data)[0]}`);
    }
  };
  const objectBuilder = (keys, value) => {
    let object = {};

    keys.split('.').reverse().forEach((key, i) => {
      if (i === 0) {
        object = {
          [key]: value
        };
      } else {
        object = {
          [key]: object
        };
      }
    });

    return object;
  };
  const testValidAndInvalid = (parentKey, fields) => {
    ['valid', 'invalid'].forEach((fieldType) => {
      fields[fieldType].forEach((values) => {
        it(`should${fieldType === 'valid' ? '' : 'nt'} allow ${parentKey} with ${JSON.stringify(values)}`, () => {
          validators[fieldType](objectBuilder(parentKey, values));
        });
      });
    });
  };
  const validDateRange = {
    from: '2000-01-01',
    to: '2000-01-02'
  };

  beforeEach(() => {
    currentSchema = schema;
  });

  context('ssn validations', () => {
    testValidAndInvalid('veteranSocialSecurityNumber', {
      valid: ['123456789'],
      invalid: ['123-45-6789', '12345678']
    });
  });

  context('name validations', () => {
    ['veteranFullName'].forEach((parentKey) => {
      testValidAndInvalid(parentKey, {
        valid: [{
          first: 'john',
          last: 'doe'
        }],
        invalid: [{
          first: 'john'
        }]
      });
    });
  });

  context('gender validations', () => {
    testValidAndInvalid('gender', {
      valid: ['M', 'F'],
      invalid: ['Z']
    });
  });

  context('address validations', () => {
    beforeEach(() => {
      let modifiedSchema = _.cloneDeep(schema);
      delete(modifiedSchema.properties.school.required);
      currentSchema = modifiedSchema;
    });

    ['veteranAddress', 'secondaryContact.address', 'school.address'].forEach((parentKey) => {
      testValidAndInvalid(parentKey, {
        valid: [{
          street: '123 a rd',
          city: 'abc',
          country: 'USA'
        }],
        invalid: [{
          city: 'foo',
          country: 'USA'
        }]
      });
    });
  });

  context('phone # validations', () => {
    ['homePhone', 'mobilePhone', 'secondaryContact.phone'].forEach((parentKey) => {
      testValidAndInvalid(parentKey, {
        valid: ['5555555555', '555-555-5555', '555 555 5555'],
        invalid: ['1234']
      });
    });
  });

  context('bank account validations', () => {
    testValidAndInvalid('bankAccount.accountType', {
      valid: ['checking', 'savings'],
      invalid: ['bitcoin']
    });

    testValidAndInvalid('bankAccount.routingNumber', {
      valid: ['123456789'],
      invalid: ['12345678']
    });
  });

  context('serviceAcademyGraduationYear validations', () => {
    testValidAndInvalid('serviceAcademyGraduationYear', {
      valid: [2004],
      invalid: [1899]
    });
  });

  context('dateRange validations', () => {
    testValidAndInvalid('activeDutyRepayingPeriod', {
      valid: [
        validDateRange,
        {
          from: '2000-01-01',
          to: 'present'
        },
        {
          from: '2000-01-01'
        }
      ],
      invalid: [
        {
          from: 'foo',
          to: 'bar'
        },
        {
          from: '2000-01-01',
          to: 'future'
        },
      ]
    });
  });

  context('date validations', () => {
    testValidAndInvalid('veteranDateOfBirth', {
      valid: [
        '2000-01-02',
        '2000-01-31',
        '2000-11-02',
        '2000-11-25',
        'XXXX-11-25',
        'XXXX-XX-25',
        '2001-11-XX',
        '2001-XX-01'
      ],
      invalid: [
        '4/6/1998',
        'Fri Aug 19 2016 15:09:46 GMT-0400 (EDT)',
        '2000-1-02',
        '2000-13-01',
        '2000-12-32',
        '2000-12-00',
        '2000-00-01',
        '2000-01-9'
      ]
    });
  });

  context('tours of duty validation', () => {
    testValidAndInvalid('toursOfDuty', {
      valid: [[{
        dateRange: validDateRange,
        serviceBranch: 'navy',
        serviceStatus: 'active',
        benefitsToApplyTo: 'chapter30'
      }]],
      invalid: [
        [{
          serviceBranch: 'navy',
          serviceStatus: 'active',
        }],
        [{
          dateRange: validDateRange,
          serviceBranch: 1,
          serviceStatus: 'active',
        }],
        [{
          dateRange: validDateRange,
          serviceBranch: 'navy',
          serviceStatus: 'active',
          benefitsToApplyTo: ['chapter85968568']
        },
        {
          dateRange: validDateRange,
          serviceBranch: 'navy',
          serviceStatus: 'active',
          involuntarilyCalledToDuty: 'yes',
          benefitsToApplyTo: 'chapter30'
        }]
      ],
    });
  });

  context('post high school trainings validation', () => {
    testValidAndInvalid('postHighSchoolTrainings', {
      valid: [[{
        name: 'college',
        dateRange: validDateRange,
        city: 'new york',
        hoursType: 'semester',
        state: 'NY'
      }]],
      invalid: [
        [{
          name: 'college',
          dateRange: {},
          city: 'new york',
          hoursType: 'semester',
          state: 'ABC'
        }]
      ]
    });
  });

  context('non military jobs validation', () => {
    testValidAndInvalid('nonMilitaryJobs', {
      valid: [[{
        name: 'president',
        months: 9999,
        postMilitaryJob: true
      }]],
      invalid: [[{
        postMilitaryJob: true,
        months: 'a'
      }]]
    });
  });

  context('senior rotc validation', () => {
    testValidAndInvalid('seniorRotc', {
      valid: [{
        commissionYear: 1981,
        rotcScholarshipAmounts: [{
          year: 1999,
          amount: 99.99
        }]
      }],
      invalid: [{
        commissionYear: 1981
      }]
    });
  });

  context('email validation', () => {
    testValidAndInvalid('email', {
      valid: [
        'foo@foo.com',
        'foo+1@foo.com'
      ],
      invalid: ['foo']
    });
  });

  context('preferredContactMethod validation', () => {
    testValidAndInvalid('preferredContactMethod', {
      valid: [
        'mail',
        'email'
      ],
      invalid: ['foo']
    });
  });

  context('benefitsRelinquished validation', () => {
    testValidAndInvalid('benefitsRelinquished', {
      valid: ['chapter30', 'unknown', 'chapter1607', 'chapter1606'],
      invalid: ['chapter33']
    });
  });

  context('serviceBefore1977 validation', () => {
    testValidAndInvalid('serviceBefore1977', {
      valid: [{
        married: true,
        haveDependents: true,
        parentDependent: false
      }],
      invalid: [{
        married: true
      }]
    });
  });

  context('school validation', () => {
    testValidAndInvalid('school', {
      valid: [{
        name: 'harvard'
      }],
      invalid: [{
        name: true
      }]
    });
  });
});
