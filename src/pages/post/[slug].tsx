import { Comments } from "@/components";
import { BlogPostMetadata } from "@/core/posts";
import fs from "fs";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/cjs/styles/prism";

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

export default function PostPage(props: { frontmatter: any; content: any }) {
  return (
    <>
      <Head>
        <title>{`${props.frontmatter.title} by Carlton Upperdine`}</title>
      </Head>
      <div className="prose mx-auto w-10/12">
        <h2 className="text-center">{props.frontmatter.title}</h2>
        <section className="text-md font-bold text-center">
          Published: {new Date(props.frontmatter.date).toDateString()}
        </section>
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  language={match[1]}
                  PreTag="div"
                  style={nord}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              );
            },
          }}
        >
          {props.content}
        </ReactMarkdown>
        {/* <div
          dangerouslySetInnerHTML={{ __html: md().render(props.content) }}
          className="border-t-2 border-b-2 mt-5"
        /> */}
        <Comments post={props.frontmatter} />
      </div>
    </>
  );
}
