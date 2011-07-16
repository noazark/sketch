# origin https://gist.github.com/913362

include Rake::DSL

require 'rake/clean'
require 'bundler'

Bundler.require(:default) if defined?(Bundler)

BIN    = "."

HAML   = FileList['**/*.haml']
LESS   = FileList['**/*.less']
COFFEE = FileList['**/*.coffee']
SASS   = FileList['**/*.scss']

HTML = HAML.ext('html')
CSS  = SASS.ext('css')
JS   = COFFEE.ext('js')

CLOBBER.include(HTML, CSS, JS)

rule '.html' => '.haml' do |t|
  puts "** HAML #{t.source}"
  mkdir_p t.source.pathmap("%{^src,#{BIN}}d")
  system 'haml','-f','html5', t.source, t.source.pathmap("%{^src,#{BIN}}X.html")
end

rule '.css' => '.scss' do |t|
  if t.source.pathmap("%n").start_with?("_")
  
  else
    puts "** SASS #{t.source}"
    mkdir_p t.source.pathmap("%{^src,#{BIN}}d")
    system 'sass', t.source, t.source.pathmap("%{^src,#{BIN}}X.css"), "--no-cache"
  end
end

rule '.js' => '.coffee' do |t|
  puts "** COFFEE #{t.source}"
  system 'coffee', '-o', t.source.pathmap("%{^src,#{BIN}}d"), '-c', t.source
end

desc "Build all HTML, CSS and JavaScript files"
task :default => (HTML + CSS + JS)

desc "Continuously watch for changes and rebuild files"
task :watch => [:default] do
  def rebuild
    system 'rake'
  rescue
    nil
  end

  begin
    FSSM.monitor(nil, ['**/*.coffee', '**/*.haml', '**/*.scss']) do
      update { rebuild }
      delete { rebuild }
      create { rebuild }
    end
  rescue FSSM::CallbackError => e
    Process.exit
  end
end
