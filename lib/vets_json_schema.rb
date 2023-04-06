require 'multi_json'
require 'script_utils'
require 'ice_nine'

module VetsJsonSchema
  base_dir = "#{__dir__}/../"

  CONSTANTS = IceNine.deep_freeze(
    MultiJson.load(
      File.read("#{base_dir}dist/constants.json")
    )
  )

  SCHEMAS = lambda do
    return_val = {}

    ScriptUtils.directories("#{base_dir}src/schemas").each do |schema|
      schema = File.basename(schema).upcase
      return_val[schema] = MultiJson.load(File.read("#{base_dir}dist/#{schema}-schema.json"))
    end

     IceNine.deep_freeze(return_val)
  end.()

  # Provides an example of valid form data conforming to given schema
  EXAMPLES = lambda do
    return_val = {}

    ScriptUtils.directories("#{base_dir}src/examples").each do |schema|
      schema = File.basename(schema).upcase
      return_val[schema] = MultiJson.load(File.read("#{base_dir}dist/#{schema}-example.json"))
    end

    IceNine.deep_freeze(return_val)
  end.()
end
