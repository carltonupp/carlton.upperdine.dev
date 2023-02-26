import { PostService } from "@/shared/services";
import { RecentPost } from "../components/RecentPost";

export async function getStaticProps() {
  const service = new PostService();
  const posts = service.getLastFive();
  return {
    props: {
      posts,
    },
  };
}

export default function Home(props: { posts: any[] }) {
  return (
    <div className="container">
      <h1 className="flex justify-center text-2xl">Recent Posts</h1>
      {props.posts.length < 1 && (
        <p className="flex justify-center">No posts yet - check in soon!</p>
      )}

      {props.posts.map((p) => (
        <RecentPost key={p.slug} slug={p.slug} frontmatter={p.frontmatter} />
      ))}
    </div>
  );
}
