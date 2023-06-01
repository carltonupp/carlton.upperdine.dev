import { BlogPostMetadata } from "@/core/posts";
import { DiscussionEmbed } from "disqus-react";

export default function Comments(props: { post: BlogPostMetadata }) {
  const disqusShortname = process.env.NEXT_PUBLIC_DISQUS_SHORTNAME ?? "";
  const disqusConfig = {
    url: `https://carlton.upperdine.dev/post/${props.post.slug}`,
    identifier: props.post.slug,
    title: props.post.title,
  };
  console.log(disqusConfig);
  return (
    <div>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
}
