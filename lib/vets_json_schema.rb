require 'multi_json'
require 'script_utils'

module VetsJsonSchema
  base_dir = "#{__dir__}/../"

  SCHEMAS = lambda do
    return_val = {}

    ScriptUtils.directories("#{base_dir}src/schemas").each do |schema|
      schema = File.basename(schema).upcase
      return_val[schema] = MultiJson.load(File.read("#{base_dir}dist/#{schema}-schema.json"))
    end

    return_val
  end.()
end
