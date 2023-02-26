import fs from "fs";
import matter from "gray-matter";

interface RecentPost {
    slug: string;
    frontmatter: any;
}

export class PostService {
    getLastFive(): RecentPost[] {
        const files = fs.readdirSync("posts");

        const posts = files.map((fileName) => {
            const slug = fileName.replace(".md", "");
            const readFile = fs.readFileSync(`posts/${fileName}`, "utf-8");
            const { data: frontmatter } = matter(readFile);

            return {
            slug,
            frontmatter,
            };
        });
        

        return posts.map(p => {
            return {
                slug: p.slug,
                frontmatter: p.frontmatter
            }
        });
    }
}