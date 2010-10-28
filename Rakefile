require 'packr'

DEPENDENCIES = %w(
  vendor/classify-0.10.0/classify.js
)

SOURCES = %w(
  src/classified.js
  src/modules/enumerable.js
  src/coreExt/array.js
  src/coreExt/function.js
  src/coreExt/regExp.js
  src/coreExt/string.js
)

def concat(files)
  files.map do |file|
    File.read(file)
  end.join("\n").strip
end

def minify(src)
  Packr.pack(src, :shrink_vars => true).strip
end

def write_file(file, src)
  File.open(file, 'w') { |f| f.write src }
end

desc 'Builds the distribution'
task :dist do
  dependencies = concat(DEPENDENCIES)
  sources      = concat(SOURCES)
  complete     = dependencies + "\n" + sources
  
  write_file 'dist/classified-bare.js', sources
  write_file 'dist/classified-bare.min.js', minify(sources)
  write_file 'dist/classified.js', complete
  write_file 'dist/classified.min.js', minify(complete)
end
task :default => :dist
