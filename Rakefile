require 'packr'

task :default => :dist

desc 'Builds the distribution'
task :dist do
  files = %w(
    vendor/classify-0.10.0/classify.js
    src/modules/enumerable.js
    src/coreExt/array.js
    src/coreExt/function.js
    src/coreExt/regExp.js
    src/coreExt/string.js
  )
  
  concatenation = files.map do |file|
    File.read(file)
  end.join("\n").strip
  
  File.open('dist/classified.js', 'w') do |file|
    file.write concatenation
  end
  
  File.open('dist/classified.min.js', 'w') do |file|
    file.write Packr.pack(concatenation, :shrink_vars => true).strip
  end
end
