source "https://rubygems.org"

gem "jekyll", "~> 4.2.0"

group :jekyll_plugins do
	gem "jekyll-paginate-v2", "~> 3.0.0"
	gem "webrick", "~> 1.7.0"
end

# TZInfo provides access to time zone data and allows times to be converted using time zone rules.
# Windows does not include zoneinfo files, so need to bundle the tzinfo-data gem.
platforms :mingw, :x64_mingw, :mswin, :jruby do
	gem "tzinfo", "~> 2.0.4"
	gem "tzinfo-data", ">= 1.2020.1"
end

# Windows Directory Monitor is a library which can be used to monitor directories for changes.
platforms :mingw, :x64_mingw, :mswin do
	gem "wdm", "~> 0.1.1"
end
