# $Id$

VERSION = 0.9.1
SHELL = /bin/sh
DOWNLOAD = /export/home/tuupola/public_html/download
JSPACKER = /export/home/tuupola/bin/jspacker

all: jeditable packed tarball latest

jeditable: jeditable.js
	cp jeditable.js $(DOWNLOAD)/jeditable-$(VERSION).js

packed: jeditable.js
	$(JSPACKER) -i jeditable.js -o jeditable-packed.js -f -e62
	cp jeditable-packed.js $(DOWNLOAD)/jeditable-packed-$(VERSION).js

latest: jeditable.js jeditable-packed.js
	cp jeditable.js $(DOWNLOAD)/jeditable-latest.js
	cp jeditable-packed.js $(DOWNLOAD)/jeditable-packed.js

tarball: examples/index.html
	rm examples/lib/jeditable.js
	cp jeditable.js examples/lib/
	/usr/local/bin/tar -X ignore.txt -czvf jEditable_examples-$(VERSION).tar.gz examples/*
	cp jEditable_examples-$(VERSION).tar.gz $(DOWNLOAD)

