import Head from "next/head";
import { RecentPost } from "@/components/RecentPost";
import { buildPageTitle } from "@/shared/utilities";
import { getPosts } from "@/core/posts";

export async function getStaticProps() {
  const posts = getPosts().slice(0, 5);
  return {
    props: {
      posts,
    },
  };
}

export default function Home(props: { posts: any[] }) {
  return (
    <>
      <Head>
        <title>{buildPageTitle("Home")}</title>
      </Head>
      <div className="container">
        <h1 className="flex justify-center text-2xl">Recent Posts</h1>
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
