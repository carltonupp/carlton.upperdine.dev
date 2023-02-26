import Link from "next/link";

export function RecentPost(props: { slug: string; frontmatter: any }) {
  return (
    <div className="border border-gray-200 m-2 rounded-xl shadow-lg overflow-hidden flex flex-col">
      <Link href={`/post/${props.slug}`}>
        <div className="p-4">
          <h1 className="font-bold">{props.frontmatter.title}</h1>
          <p>{props.frontmatter.blurb}</p>
          <p className="text-sm font-bold">
            Pushed: {new Date(props.frontmatter.date).toDateString()}
          </p>
        </div>
      </Link>
    </div>
  );
}
