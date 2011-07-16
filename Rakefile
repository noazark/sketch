# origin https://gist.github.com/913362
require 'rake/clean'

BIN    = "public_html"

HAML   = FileList['**/*.haml']
LESS   = FileList['**/*.less']
COFFEE = FileList['**/*.coffee']
SASS   = FileList['**/*.scss']

HTML = HAML.ext('html')
CSS  = SASS.ext('css')
JS   = COFFEE.ext('js')

CLOBBER.include(HTML, CSS, JS)

rule '.html' => '.haml' do |t|
   puts "  HAML #{t.source}"
   mkdir_p t.source.pathmap("%{^src,#{BIN}}d")
   sh 'haml','-f','html5', t.source, t.source.pathmap("%{^src,#{BIN}}X.html")
#   sh 'haml', t.source, t.name
end

rule '.css' => '.scss' do |t|   
   puts "  SASS #{t.source}"
   mkdir_p t.source.pathmap("%{^src,#{BIN}}d")
   sh 'sass', t.source, t.source.pathmap("%{^src,#{BIN}}X.css"), "--no-cache"
end

rule '.js' => '.coffee' do |t|
    puts "COFFEE #{t.source}"
    sh 'coffee', '-o', t.source.pathmap("%{^src,#{BIN}}d"), '-c', t.source
end

desc "Build all HTML, CSS and JavaScript files"
task :default => (HTML + CSS + JS)

desc "Continuously watch for changes and rebuild files"
task :watch => [:default] do
    require 'rubygems'
    require 'fssm'

    def rebuild
        sh 'rake'
        puts "    OK"
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
