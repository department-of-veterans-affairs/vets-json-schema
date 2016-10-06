require 'json'

module VetsJsonSchema
  EDUCATION_BENEFITS = JSON.parse(File.read("#{__dir__}/../dist/edu-benefits-schema.json"))
end
