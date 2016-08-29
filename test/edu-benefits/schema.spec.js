import { expect } from 'chai';
import schema from '../../dist/edu-benefits-schema.json';
import Ajv from 'ajv';

describe('education benefits json schema', () => {
  let ajv;
  const validateSchema = (data) => {
    return ajv.validate('edu-benefits-schema', data);
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
  const validDate = '2000-01-01';
  const validDateRange = {
    from: validDate,
    to: '2000-01-02'
  };

  before(() => {
    ajv = new Ajv();
    ajv.addSchema(schema, 'edu-benefits-schema');
  });

  context('ssn validations', () => {
    testValidAndInvalid('socialSecurityNumber', {
      valid: ['123456789'],
      invalid: ['123-45-6789', '12345678']
    });
  });

  context('name validations', () => {
    ['fullName', 'secondaryContact.fullName'].forEach((parentKey) => {
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
    ['address', 'secondaryContact.address', 'schoolAddress'].forEach((parentKey) => {
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
    ['phone', 'mobile', 'secondaryContact.phone'].forEach((parentKey) => {
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
    testValidAndInvalid('birthday', {
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
        involuntarilyCalledToDuty: true,
        benefitsToApplyTo: ['chapter33', 'chapter30', 'chapter1606', 'chapter32']
      }]],
      invalid: [
        [{
          serviceBranch: 'navy',
          serviceStatus: 'active',
          involuntarilyCalledToDuty: true
        }],
        [{
          dateRange: validDateRange,
          serviceBranch: 1,
          serviceStatus: 'active',
          involuntarilyCalledToDuty: true
        }],
        [{
          dateRange: validDateRange,
          serviceBranch: 'navy',
          serviceStatus: 'active',
          involuntarilyCalledToDuty: true,
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
        state: 'NY'
      }]],
      invalid: [[{
        name: 'college'
      }]]
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
        commissionDate: validDate,
        rotcScholarshipAmounts: [{
          year: 1999,
          amount: 99.99
        }]
      }],
      invalid: [{
        commissionDate: validDate,
      }]
    });
  });

  context('previous va claims validation', () => {
    testValidAndInvalid('previousVaClaims', {
      valid: [[{
        name: 'educationBenefits.chapter30',
        fileNumber: '123'
      }]],
      invalid: [
        [{
          fileNumber: '123'
        }],
        [{
          name: 'not on the list',
          fileNumber: '123'
        }]
      ]
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
});
