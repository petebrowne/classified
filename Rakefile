require 'packr'

FILES = %w(
  src/header.js
  src/modules/enumerable.js
  src/modules/events.js
  src/extensions/array.js
  src/extensions/function.js
  src/extensions/number.js
  src/extensions/object.js
  src/extensions/regexp.js
  src/extensions/string.js
  src/classes/hash.js
  src/footer.js
)

desc 'Builds the distribution'
task :dist do
  source = cat(FILES).sub(/@VERSION/, version)
  header = source.match /((^\s*\/\/.*\n)+)/
  
  File.open('dist/classified.js', 'w') do |file|
    file.write source
  end
  
  File.open('dist/classified.min.js', 'w') do |file|
    file.write header[1]
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

desc 'Open up specs in a browser'
task :spec => :dist do
  %x(open spec/index.html)
end

def version
  @version ||= File.read('VERSION')
end

def cat(files)
  files.map do |file|
    File.read(file)
  end.join("\n")
end

def guard_clean
  if %x(git ls-files -dm).split("\n").size.zero?
    yield
  else
    puts 'Commit your changes first...'
  end
end
