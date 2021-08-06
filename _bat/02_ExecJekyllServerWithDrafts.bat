@echo off

echo Go Home Page
start chrome.exe "http://localhost:4000/silverag-corgi.github.io/"

echo Exec Jekyll Server
cd ..
bundle exec jekyll serve --baseurl "/silverag-corgi.github.io" --drafts
pause
