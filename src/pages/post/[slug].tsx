import Comments from "@/components/Comments";
import { BlogPostMetadata } from "@/shared/models";
import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";
import Head from "next/head";

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
    <div className="prose mx-auto w-10/12">
      <Head>
        <title>{props.frontmatter.title} by Carlton Upperdine</title>
      </Head>
      <h2 className="text-center">{props.frontmatter.title}</h2>
      <section className="text-md font-bold text-center">
        Published: {new Date(props.frontmatter.date).toDateString()}
      </section>
      <div
        dangerouslySetInnerHTML={{ __html: md().render(props.content) }}
        className="border-t-2 border-b-2 mt-5"
      />
      <Comments post={props.frontmatter} />
    </div>
  );
}
