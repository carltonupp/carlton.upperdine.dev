import { RecentPost } from "@/components/RecentPost";
import { BlogPost, getPosts } from "@/core/posts";
import { buildPageTitle } from "@/core/utils";
import Head from "next/head";

export async function getStaticProps() {
  const posts = getPosts();

  return {
    props: {
      posts,
    },
  };
}

export default function Posts(props: { posts: BlogPost[] }) {
  return (
    <>
      <Head>
        <title>{buildPageTitle("Posts")}</title>
      </Head>
      <div className="container">
        <h1 className="flex justify-center text-2xl">Posts</h1>
        {props.posts.length < 1 && (
          <p className="flex justify-center">No posts yet - check in soon!</p>
        )}
        <div className="grid justify-center mt-3">
          {props.posts.map((p) => (
            <RecentPost
              key={p.slug}
              slug={p.slug}
              frontmatter={p.frontmatter}
            />
          ))}
        </div>
      </div>
    </>
  );
}
