import { PostService } from "@/shared/services/PostService";
import Head from "next/head";
import { RecentPost } from "../components/RecentPost";

export async function getStaticProps() {
  const service = new PostService();
  const posts = service.getList().slice(0, 5);
  return {
    props: {
      posts,
    },
  };
}

export default function Home(props: { posts: any[] }) {
  return (
    <div className="container">
      <Head>
        <title>/home/carlton</title>
      </Head>
      <h1 className="flex justify-center text-2xl">Recent Posts</h1>
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
