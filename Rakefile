require 'rake'
require 'sprockets'
require 'packr'

desc 'Builds the distribution.'
task :dist do
  src_dir  = File.expand_path('../src', __FILE__)
  dist_dir = File.expand_path('../dist', __FILE__)
  
  secretary = Sprockets::Secretary.new(
    :root           => src_dir,
    :load_path      => [ src_dir ],
    :source_files   => [ File.join(src_dir, 'classified.js') ],
    :strip_comments => false
  )
  concatenation = secretary.concatenation.to_s
  
  File.open(File.join(dist_dir, 'classified.js'), 'w') do |file|
    file.write concatenation.strip
  end
  
  File.open(File.join(dist_dir, 'classified.min.js'), 'w') do |file|
    file.write Packr.pack(concatenation, :shrink_vars => true).strip
  end
end
