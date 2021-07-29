@echo off

echo Running Jekyll Server
cd ..
bundle exec jekyll serve --baseurl "/silverag-corgi.github.io" -w
pause

