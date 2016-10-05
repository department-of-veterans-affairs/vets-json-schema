Gem::Specification.new do |gem|
  gem.name = 'vets_json_schema'
  gem.version = '0.0.1'
  gem.summary = 'JSON Schemas for all Vets.gov projects'
  gem.author = 'VA devs'

  gem.files = `git ls-files`.split("\n")
  gem.test_files = `git ls-files -- {test,spec,features}/*`.split("\n")
  gem.require_paths = ['lib']
end
