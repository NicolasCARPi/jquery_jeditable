# $Id$

VERSION = 0.9.1
SHELL = /bin/sh
DOWNLOAD = /export/home/tuupola/public_html/download

all: latest jeditable tarball

latest: jeditable.js
	cp jeditable.js $(DOWNLOAD)/jeditable_latest.js

jeditable: jeditable.js
	cp jeditable.js $(DOWNLOAD)/jeditable-$(VERSION).js

tarball: examples/index.html
	rm examples/lib/jeditable.js
	cp jeditable.js examples/lib/
	/usr/local/bin/tar -X ignore.txt -czvf jEditable_examples-$(VERSION).tar.gz examples/*
	cp jEditable_examples-$(VERSION).tar.gz $(DOWNLOAD)

