# Notes to contributors

* Target the 'experimental' branch
* Use 4 spaces for indent
* Use UNIX-style line ending
* Use UTF-8 without BOM
* Use a javascript linter
* Use single quotes for strings

# Generate the API doc

~~~bash
npm -g install documentation
documentation build src -f html -o api
~~~
