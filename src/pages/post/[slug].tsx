import { BlogPostMetadata } from "@/shared/models";
import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";

export async function getStaticPaths() {
  const files = fs.readdirSync("posts");
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(props: { params: BlogPostMetadata }) {
  const fileName = fs.readFileSync(`posts/${props.params.slug}.md`, "utf-8");
  const { data: frontmatter, content } = matter(fileName);
  return {
    props: {
      frontmatter,
      content,
    },
  };
}

export default function PostPage(props: {
  frontmatter: BlogPostMetadata;
  content: any;
}) {
  return (
    <div className="prose mx-auto">
      <h1>{props.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: md().render(props.content) }} />
    </div>
  );
}
