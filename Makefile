# $Id$

VERSION = 1.2.1
SHELL = /bin/sh
DOWNLOAD = /export/home/tuupola/old_public_html/download
JSPACKER = /export/home/tuupola/bin/jspacker

#all: jeditable packed tarball latest
all: jeditable packed latest

jeditable: jquery.jeditable.js
	cp jquery.jeditable.js $(DOWNLOAD)/jquery.jeditable-$(VERSION).js

packed: jquery.jeditable.js
	$(JSPACKER) -i jquery.jeditable.js -o jquery.jeditable-packed.js -f -e62
	cp jquery.jeditable-packed.js $(DOWNLOAD)/jquery.jeditable-packed-$(VERSION).js

latest: jquery.jeditable.js jquery.jeditable-packed.js
	cp jquery.jeditable.js $(DOWNLOAD)/jquery.jeditable.js
	cp jquery.jeditable-packed.js $(DOWNLOAD)/jquery.jeditable-packed.js

tests: jquery.jeditable.js
	rm examples/lib/jquery.jeditable.js
	cp jquery.jeditable.js examples/lib/

tarball: examples/index.html
	rm examples/lib/jquery.jeditable.js
	cp jquery.jeditable.js examples/lib/
	/usr/local/bin/tar -X ignore.txt -czvf jEditable_examples-$(VERSION).tar.gz examples/*
	cp jEditable_examples-$(VERSION).tar.gz $(DOWNLOAD)

