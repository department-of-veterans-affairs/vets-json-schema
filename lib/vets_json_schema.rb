require 'multi_json'

module VetsJsonSchema
  EDUCATION_BENEFITS = MultiJson.load(File.read("#{__dir__}/../dist/edu-benefits-schema.json"))
end
