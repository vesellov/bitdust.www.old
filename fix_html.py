import os
import sys
import re
md_base = ''
# gitlab_base = 'http://gitlab.bitdust.io/devel/bitdust/blob/master/'
template = open('template.htm').read()
keywords = open('keywords.txt').read().replace('\n', ', ')
src = sys.argv[1]
dest = sys.argv[2]
basepath = ''
if len(sys.argv) > 3:
    basepath = sys.argv[3]
if not os.path.isdir(os.path.dirname(dest)):
    print "create", os.path.dirname(dest)
    os.makedirs(os.path.dirname(dest))
site_url = "http://bitdust.io"
sbody = open(src).read()
sbody = re.sub('a href="(.+?)\.md"', 'a href="%s\g<1>.html"' % md_base, sbody)
# sbody = re.sub('a href="(.+?)\.py"', 'a href="%s\g<1>.py"' % gitlab_base, sbody)
sbody = re.sub('a href="../docs/(.+?)\.html"', 'a href="\g<1>.html"', sbody)
sbody = re.sub('a href="docs/(.+?)\.html"', 'a href="\g<1>.html"', sbody)
sbody = re.sub('\>\<img alt="', '><img width=1000 alt="', sbody) 
sbody = re.sub('a href="(\w+?)"', 'a href="\g<1>.html"', sbody)
sbody = re.sub('a href="#(.+?)"', 'a href="%s#\g<1>"' % os.path.basename(src), sbody)
sbody = re.sub('\<p\>\<style', '<style', sbody)
sbody = re.sub('\</style\>\</p\>', '</style>', sbody)
def _clear_id(inp):
    return inp.replace('<em>','_').replace('</em>','_').replace('<','').replace('>','').replace('[','').replace(']','').replace(' ','-').lower()
def _clear_title(inp):
    return inp.replace('<em>','_').replace('</em>','_').replace('<','&lt;').replace('>','&gt;')
sbody = re.sub('\<h(\d)\>(.+?)\<\/h(\d)\>',
               lambda m: '<h%s id="%s">%s</h%s>' % (m.group(1), _clear_id(m.group(2)), _clear_title(m.group(2)), m.group(3)), sbody)
sbody = re.sub('\<li\>\<a href="(.+?)"\>(.+?)\</a\>\</li\>', lambda m: '<li><a href="%s">%s</a></li>' % (m.group(1), _clear_title(m.group(2))), sbody)
# sbody = sbody.replace(
    # '<div class=fbcomments markdown="1">', 
    # '<div class="fb-comments" data-href="%s/%s" data-width="500" data-numposts="5">' % (
        # site_url, os.path.basename(dest)))
        
disqus = """
<div id="disqus_thread"></div>
<script>
    var disqus_config = function () {
        this.page.url = "%s";   
        this.page.identifier = "%s"
    };
    (function() { 
        var d = document, s = d.createElement('script');
        s.src = '//bitdust.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    })();
</script>
<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript" rel="nofollow">comments powered by Disqus.</a></noscript>
""" % ((site_url+'/'+os.path.basename(dest)), src.replace('.html', '').replace('@build\\', ''))
        
sbody = sbody.replace(
    '<div class=fbcomments>', disqus)
    # '<div class="fb-comments" data-href="%s/%s" data-numposts="5" data-width="100%%" data-colorscheme="light">' % (
    #     site_url, os.path.basename(dest))) 
    
try:
    title = re.search('<h1.*?>(.+?)</h1>', sbody).group(1)
except:
    title = src.replace('.html', '').capitalize()
if not title.count('BitDust'):
    title = 'BitDust : ' + title
newbody = template % {
    'title': title,
    'keywords': keywords,
    'body': sbody, 
    'basepath': basepath,
    'site_url': site_url,
    'filepath': os.path.basename(dest),
}
open(dest, mode='w').write(newbody)

