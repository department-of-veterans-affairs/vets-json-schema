require 'multi_json'

module VetsJsonSchema
  %w(edu-benefits healthcare-application change-of-program).each do |schema|
    const_set(schema.underscore.upcase, MultiJson.load(File.read("#{__dir__}/../dist/#{schema}-schema.json")))
  end
end
