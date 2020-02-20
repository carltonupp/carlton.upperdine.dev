import os, re
from bs4 import BeautifulSoup
from markdown import markdown

CONTENT_DIRECTORY = ".\content"
MARKDOWN_FILE_EXTENSION = ".md"

def get_files_in_directory(path, list_of_files = list()):
   
    for root, dirs, files in os.walk(path):
        for file in files:
            files.append(path + "\\" + file)

        for dir in dirs:
            get_files_in_directory(files)

    


def get_markdown_files():

    for root, dirs, files in os.walk(CONTENT_DIRECTORY):

        markdown_files = []

        for file in files:
            if file.endswith(MARKDOWN_FILE_EXTENSION):
                print(file)
                file_path = os.path.join(root, file)
                markdown_files.append(file_path)
        
        for dir in dirs:
            
        
        return markdown_files


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


files = get_markdown_files()

for file in files:
    parse_markdown_file(file)