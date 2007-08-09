# $Id$

VERSION = 1.4.0RC1
SHELL = /bin/sh
DOWNLOAD = /export/home/tuupola/old_public_html/download
JSPACKER = /export/home/tuupola/bin/jspacker
JSMIN    = /export/home/tuupola/bin/jsmin

#all: jeditable packed tarball latest
all: jeditable packed minified latest

jeditable: jquery.jeditable.js jquery.jeditable.inputs.js
	cp jquery.jeditable.js $(DOWNLOAD)/jquery.jeditable-$(VERSION).js
#	cp jquery.jeditable.inputs.js $(DOWNLOAD)/jquery.jeditable.inputs-$(VERSION).js

packed: jquery.jeditable.js
	$(JSPACKER) -i jquery.jeditable.js -o jquery.jeditable.pack.js -f -e62
	cp jquery.jeditable.pack.js $(DOWNLOAD)/jquery.jeditable-$(VERSION).pack.js

minified: jquery.jeditable.js
	$(JSMIN) < jquery.jeditable.js > jquery.jeditable.mini.js 
	cp jquery.jeditable.mini.js $(DOWNLOAD)/jquery.jeditable-$(VERSION).mini.js

latest: jquery.jeditable.js jquery.jeditable.pack.js jquery.jeditable.inputs.js
	cp jquery.jeditable.js $(DOWNLOAD)/jquery.jeditable.js
	cp jquery.jeditable.inputs.js $(DOWNLOAD)/jquery.jeditable.inputs.js
	cp jquery.jeditable.pack.js $(DOWNLOAD)/jquery.jeditable.pack.js
	cp jquery.jeditable.mini.js $(DOWNLOAD)/jquery.jeditable.mini.js

tests: jquery.jeditable.js
	rm examples/lib/jquery.jeditable.js
	cp jquery.jeditable.js examples/lib/

tarball: examples/index.html
	rm examples/lib/jquery.jeditable.js
	cp jquery.jeditable.js examples/lib/
	/usr/local/bin/tar -X ignore.txt -czvf jEditable_examples-$(VERSION).tar.gz examples/*
	cp jEditable_examples-$(VERSION).tar.gz $(DOWNLOAD)

