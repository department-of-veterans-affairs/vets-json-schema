import testData from './test-data';
import { expect } from 'chai';

export default class SharedTests {
  constructor(schemaTestHelper) {
    this.schemaTestHelper = schemaTestHelper;
  }

  requireSsnOrFile(ssnName = 'veteranSocialSecurityNumber') {
    it('should require ssn or file number', () => {
      expect(this.schemaTestHelper.validateSchema({})).to.equal(false);
      expect(this.schemaTestHelper.ajv.errors[0].params.missingProperty).to.equal('.vaFileNumber');

      [
        { [ssnName]: '123456789' },
        { vaFileNumber: '12345678' },
        {
          [ssnName]: '123456789',
          vaFileNumber: '12345678'
        }
      ].forEach((schemaData) => {
        this.schemaTestHelper.schemaExpect(true, schemaData);
      });
    });
  }

  runTest(name, fields) {
    const testDatum = testData[name];
    fields = fields || testDatum.fields || [name];

    fields.forEach((field) => {
      this.schemaTestHelper.testValidAndInvalid(field, testDatum.data);
    });
  }
};
