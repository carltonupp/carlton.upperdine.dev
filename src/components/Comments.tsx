import { BlogPostMetadata } from "@/shared/models";
import { DiscussionEmbed } from "disqus-react";

export default function Comments(props: { post: BlogPostMetadata }) {
  const disqusShortname = process.env.NEXT_PUBLIC_DISQUS_SHORTNAME ?? "";
  console.log(disqusShortname);
  const disqusConfig = {
    url: `https://carlton.upperdine.dev/post/${props.post.slug}`,
    identifier: props.post.slug,
    title: props.post.title,
  };
  return (
    <div>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
}
