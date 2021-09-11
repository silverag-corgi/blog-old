@echo off

echo Go Home Page
start chrome.exe "http://localhost:4000/blog/"

echo Exec Jekyll Server
cd ..
bundle exec jekyll serve --drafts
pause
