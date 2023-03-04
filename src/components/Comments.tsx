import { BlogPostMetadata } from "@/shared/models";
import { DiscussionEmbed } from "disqus-react";
const isProduction = process.env.NODE_ENV === "production";

export default function Comments(props: { post: BlogPostMetadata }) {
  const disqusShortname = process.env.NEXT_PUBLIC_DISQUS_SHORTNAME ?? "";
  const disqusConfig = {
    url: `https://carlton.upperdine.dev/post/${props.post.slug}`,
    identifier: props.post.slug,
    title: props.post.title,
  };
  return (
    <div>
      {!isProduction && (
        <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
      )}
    </div>
  );
}
