import { expect } from 'chai';
import { it } from 'mocha';
import schema from '../../../src/schemas/22-10282/schema';

describe('22-10282 Schema Tests', () => {
  it('should have required fields', () => {
    const requiredFields = ['veteranFullName', 'veteranDesc', 'email', 'country', 'state'];
    expect(schema.required).to.include.members(requiredFields);
  });

  it('should defines country as a string with correct enum', () => {
    expect(schema.properties.country).to.have.property('$ref', '#/definitions/country');
  });

  it('should defines state as a string with correct enum', () => {
    expect(schema.properties.state).to.have.property('$ref', '#/definitions/state');
  });

  it('should validate raceAndGender enum', () => {
    expect(schema.properties.raceAndGender.enum).to.deep.equal(['Yes', 'No']);
  });

  it('should validates highestLevelOfEducation structure', () => {
    const education = schema.properties.highestLevelOfEducation;
    expect(education).to.have.property('type', 'object');
    expect(education).to.have.property('properties');
    expect(education.properties).to.have.property('level');
    expect(education.properties.level)
      .to.have.property('enum')
      .that.is.an('array');
  });
});
