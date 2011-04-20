require 'rubygems'
require 'bundler'
Bundler.require

load 'jasmine/tasks/jasmine.rake'
load 'sauce/jasmine/jasmine-sauce.rake'

namespace :js do
  task :combine do
    secretary = Sprockets::Secretary.new(
      :source_files => ["lib/jsmocha.js", "lib/jsmocha/*.js"]
    )
    
    # Generate a Sprockets::Concatenation object from the source files
    concatenation = secretary.concatenation
    
    # Write the concatenation to disk
    concatenation.save_to("build/jsmocha.js")
    puts "generated jsmocha.js in the build directory"
  end
  
  task :compress do
    executable = File.join(File.dirname(__FILE__), 'vendor', 'closure', 'compiler.jar')
    `java -jar #{executable} --js=build/jsmocha.js --js_output_file=build/jsmocha-min.js`
    puts "generated jsmocha-min.js in the build directory"
  end
  
  task :create_build_dir do
    FileUtils.mkdir('build') unless File.exists?('build')
  end
  
  desc "Combine and compress all javascript files into jsmocha.js and jsmocha-min.js"
  task :build => [:create_build_dir, :combine, :compress]
end

class Sauce::Jasmine::SeleniumDriver

  # Nasty hack to get around issues with JSON.stringify and circular data structures
  def test_results
    eval_js("var result = {}; var report = jsApiReporter.results(); for(var n in report) { result[n] = {result: report[n].result}; }; if (window.Prototype && Object.toJSON) { Object.toJSON(result) } else { JSON.stringify(result) }")
  end

end