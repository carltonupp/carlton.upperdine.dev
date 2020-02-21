"""gets and parses markdown files"""

import os
from bs4 import BeautifulSoup
from markdown import markdown
from grammarchecker import htmlsanitiser

MARKDOWN_FILE_EXTENSION = ".md"

def get_markdown_files(directory):

    """gets all markdown files in the given directory."""

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

    """ parses the file and extracts the text """

    contents = open(file_path, "r", encoding="utf-8").read()

    html = markdown(contents)

    # remove code snippets
    html = htmlsanitiser.sanitise(html)

    soup = BeautifulSoup(html, "html.parser")
    text = ''.join(soup.findAll(text=True))

    return text
