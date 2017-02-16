Gem::Specification.new do |gem|
  gem.name = 'vets_json_schema'

  file = File.read('package.json')
  gem.version = file.match(/"version": "((\\"|[^"])*)"/)[1]
  gem.summary = 'JSON Schemas for all Vets.gov projects'
  gem.author = 'VA devs'

  gem.files = `git ls-files`.split("\n")
  gem.test_files = `git ls-files -- {test,spec,features}/*`.split("\n")
  gem.require_paths = ['lib']

  gem.add_dependency 'multi_json', '~> 1.0'
  gem.add_dependency 'script_utils', '0.0.4'
end
