require 'Sprockets'

namespace :package do
  desc "Combine all javascript files into jsmocha.js"
  task :js do
    secretary = Sprockets::Secretary.new(
      :source_files => ["lib/**/*.js"]
    )
    
    # Generate a Sprockets::Concatenation object from the source files
    concatenation = secretary.concatenation
    
    # Write the concatenation to disk
    concatenation.save_to("hth-js-lib.js")
    puts "generated hth-js-lib.js in the root folder"
  end
end