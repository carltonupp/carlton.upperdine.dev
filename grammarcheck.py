import os, re, glob, functools
from bs4 import BeautifulSoup
from markdown import markdown

CONTENT_DIRECTORY = ".\content"
MARKDOWN_FILE_EXTENSION = ".md"

def get_markdown_files(directory):

    directory_list = os.listdir(directory)
    all_files = list()

    for item in directory_list:

        full_path = os.path.join(directory, item)

        if os.path.isdir(full_path):
            all_files += get_markdown_files(full_path)
        else:
            if item.endswith(MARKDOWN_FILE_EXTENSION):
                all_files.append(full_path)

    return all_files

def parse_markdown_file(file_path):

    # parses the file and extracts

    contents = open(file_path, "r", encoding="utf-8").read()

    html = markdown(contents)

    # remove code snippets
    html = re.sub(r'<pre>(.*?)</pre>', '', html)
    html = re.sub(r'<code>(.*?)</code >', '', html)
    html = re.sub(r'^((.*\n))*(\+\+\+)', '', html)

    soup = BeautifulSoup(html, "html.parser")
    text = ''.join(soup.findAll(text=True))

    print(text)


files = get_markdown_files(CONTENT_DIRECTORY)

for file in files:
    print(parse_markdown_file(file))