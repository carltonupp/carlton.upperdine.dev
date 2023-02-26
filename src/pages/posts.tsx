import { RecentPost } from "@/components/RecentPost";
import { PostService } from "@/shared/services";
import Head from "next/head";

export async function getStaticProps() {
  const service = new PostService();
  const posts = service.getList();

  return {
    props: {
      posts,
    },
  };
}

export default function Posts(props: { posts: any[] }) {
  return (
    <div className="container">
      <Head>
        <title>/home/carlton/posts</title>
      </Head>
      <h1 className="flex justify-center text-2xl">Posts</h1>
      {props.posts.length < 1 && (
        <p className="flex justify-center">No posts yet - check in soon!</p>
      )}
      <div className="grid justify-center mt-3">
        {props.posts.map((p) => (
          <RecentPost key={p.slug} slug={p.slug} frontmatter={p.frontmatter} />
        ))}
      </div>
    </div>
  );
}
