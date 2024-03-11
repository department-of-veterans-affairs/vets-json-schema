require 'multi_json'
require 'script_utils'

module VetsJsonSchema
  base_dir = "#{__dir__}/../"

  CONSTANTS = MultiJson.load(
    File.read("#{base_dir}dist/constants.json")
  )

  SCHEMAS = lambda do
    return_val = {}

    ScriptUtils.directories("#{base_dir}src/schemas").each do |schema|
      schema = File.basename(schema).upcase
      return_val[schema] = MultiJson.load(File.read("#{base_dir}dist/#{schema}-schema.json"))
    end

    return_val
  end.()

  # Provides an example of valid form data conforming to given schema
  EXAMPLES = lambda do
    return_val = {}

    ScriptUtils.directories("#{base_dir}src/examples").each do |schema|
      schema = File.basename(schema).upcase
      return_val[schema] = MultiJson.load(File.read("#{base_dir}dist/#{schema}-example.json"))
    end

    return_val
  end.()

  VERSION = MultiJson.load(
    File.read("#{base_dir}dist/version.json")
  )&['version']
end
