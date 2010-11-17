require 'packr'

def version
  @version ||= File.read('VERSION')
end

def guard_clean
  if %x(git ls-files -dm).split("\n").size.zero?
    yield
  else
    puts 'Commit your changes first...'
  end
end

files = %w(
  src/classified.js
  src/modules/enumerable.js
  src/ext/array.js
  src/ext/function.js
  src/ext/number.js
  src/ext/regExp.js
  src/ext/string.js
)

desc 'Builds the distribution'
task :dist do
  source = files.map do |file|
    File.read(file)
  end.join("\n")
  
  source.sub!(Regexp.new(Regexp.escape('{{ version }}')), "version #{version}")
  
  File.open('dist/classified.js', 'w') do |file|
    file.write source
  end
  
  File.open('dist/classified.min.js', 'w') do |file|
    file.write Packr.pack(source, :shrink_vars => true).strip
  end
end
task :default => :dist

desc 'Tags and releases the current version'
task :release do
  guard_clean do
    %x(git tag -am 'Version #{version}' v#{version})
    %x(git push --tags --quiet)
  end
end
