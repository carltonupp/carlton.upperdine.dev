"""Sanitises the html generated from my markdown"""

import re

def sanitise(html):
    """the god function"""
    html = __remove_preformatted_text(html)
    html = __remove_hugo_tags(html)
    html = __remove_code_tags(html)

    return html

def __remove_preformatted_text(html):
    html = __remove(r'<pre>(.*?)</pre>', html)
    return html

def __remove_code_tags(html):
    html = __remove(r'<code>(.*?)</code >', html)
    html = __remove(r'(\`\`\`)[^(\`\`\`)]*(\`\`\`)', html)
    return html

def __remove_hugo_tags(html):
    html = __remove(r'^((.*\n))*(\+\+\+)', html)
    return html

def __remove(pattern, html):
    html = re.sub(pattern, '', html, re.MULTILINE | re.VERBOSE)
    return html