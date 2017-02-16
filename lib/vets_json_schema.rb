require 'multi_json'
require 'script_utils'

module VetsJsonSchema
  base_dir = "#{__dir__}/../"

  ScriptUtils.directories("#{base_dir}src/schemas").each do |schema|
    schema = File.basename(schema)
    const_set(schema.underscore.upcase, MultiJson.load(File.read("#{base_dir}dist/#{schema}-schema.json")))
  end
end
