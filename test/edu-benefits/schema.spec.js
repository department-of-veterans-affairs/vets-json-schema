import { expect } from 'chai';
import schema from '../../dist/edu-benefits-schema.json';
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
    ['veteranFullName', 'secondaryContact.fullName'].forEach((parentKey) => {
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
        valid: ['5555555555'],
        invalid: ['1a']
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
        {
          from: '2000-01-01'
        }
      ]
    });
  });

  context('date validations', () => {
    testValidAndInvalid('veteranDateOfBirth', {
      valid: ['2000-01-02'],
      invalid: ['4/6/1998', 'Fri Aug 19 2016 15:09:46 GMT-0400 (EDT)']
    });
  });

  context('tours of duty validation', () => {
    testValidAndInvalid('toursOfDuty', {
      valid: [[{
        dateRange: validDateRange,
        serviceBranch: 'navy',
        serviceStatus: 'active',
        involuntarilyCalledToDuty: 'yes',
        benefitsToApplyTo: ['chapter33', 'chapter30', 'chapter1606', 'chapter32']
      }]],
      invalid: [
        [{
          serviceBranch: 'navy',
          serviceStatus: 'active',
          involuntarilyCalledToDuty: 'yes'
        }],
        [{
          dateRange: validDateRange,
          serviceBranch: 1,
          serviceStatus: 'active',
          involuntarilyCalledToDuty: 'yes'
        }],
        [{
          dateRange: validDateRange,
          serviceBranch: 'navy',
          serviceStatus: 'active',
          involuntarilyCalledToDuty: 'yes',
          benefitsToApplyTo: ['chapter85968568']
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
          name: 'college'
        }],
        [{
          name: 'college',
          dateRange: validDateRange,
          city: 'new york',
          hoursType: 'semestar',
          state: 'NY'
        }],
        [{
          name: 'college',
          dateRange: validDateRange,
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
        name: 'programmer',
        months: 1
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
        commissionYear: 1981,
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

  context('previous va claims validation', () => {
    testValidAndInvalid('previousVaClaims', {
      valid: [
        [{
          claimType: 'vocationalRehab'
        }],
        [{
          claimType: 'vocationalRehab',
          fileNumber: 'blah',
          sponsorVeteran: {
            fileNumber: 'number'
          }
        }]
      ],
      invalid: [
        [{
          fileNumber: 'blah',
        }]
      ]
    });
  });
});
