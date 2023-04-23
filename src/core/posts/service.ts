import fs from "fs";
import matter, { GrayMatterFile } from "gray-matter";
import { BlogPost, FileTuple } from "./models";

const readFile = (file: string) => fs.readFileSync(`posts/${file}`, "utf-8");
const parseBlogPost = (slug: string, { data: frontmatter }: GrayMatterFile<string>): BlogPost => {
    return { slug, frontmatter };
};
const sortByDate = (a: BlogPost, b: BlogPost) => {
    const [x, y] = [a.frontmatter.date, b.frontmatter.date]
        .map((date) => new Date(date)); 
    return x < y ? 1 : -1;
};

export const getPosts = () => fs.readdirSync("posts")
    .map((file): FileTuple<string> => [file.replace(".md", ""), readFile(file)])
    .map(([slug, file]): FileTuple<GrayMatterFile<string>> => [slug, matter(file)])
    .map(([slug, file]): BlogPost => parseBlogPost(slug, file))
    .sort(sortByDate);