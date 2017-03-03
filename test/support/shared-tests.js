import testData from './test-data';

export default class SharedTests {
  constructor(schemaTestHelper) {
    this.schemaTestHelper = schemaTestHelper;
  }

  runTest(name, fields) {
    const testDatum = testData[name];
    fields = fields || testDatum.fields || [name];

    fields.forEach((field) => {
      this.schemaTestHelper.testValidAndInvalid(field, testDatum.data);
    });
  }
};
