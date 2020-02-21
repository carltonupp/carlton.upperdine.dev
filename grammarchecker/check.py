from grammarchecker import fileparser
import functools

CONTENT_DIRECTORY = ".\\content"

files = fileparser.get_markdown_files(CONTENT_DIRECTORY)

file_text = [fileparser.parse_markdown_file(file) for file in files]

