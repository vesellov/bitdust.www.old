
SOURCE_DIR = $(CURDIR)/../bitdust.docs

.PHONY: html one

html:
	@for mdfilepath in $(SOURCE_DIR)/*.md; do \
		mdfilename=`basename "$$mdfilepath"`; \
		mdname=`basename "$$mdfilepath" .md`; \
		htmlfilename="$$mdname.html"; \
		python md2html.py "$$mdfilepath" > "./$$htmlfilename"; \
		python fix_html.py "./$$htmlfilename" "./$$htmlfilename"; \
		python -c "import sys; sys.stdout.write('.');"; \
	done; \
	echo;

one:
	mdfilepath=`<`; \
	mdfilename=`basename "$$mdfilepath"`; \
	echo $*;
