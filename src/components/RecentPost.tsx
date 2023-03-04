import Link from "next/link";

export function RecentPost(props: { slug: string; frontmatter: any }) {
  return (
    <div className="border border-gray-200 m-2 rounded-xl shadow-lg overflow-hidden flex flex-col">
      <Link href={`/post/${props.slug}`}>
        <div className="p-4 text-center">
          <h1 className="font-extrabold text-xl">{props.frontmatter.title}</h1>
          <p className="text-sm font-semibold border-b-2">
            Published: {new Date(props.frontmatter.date).toDateString()}
          </p>
          <p>{props.frontmatter.blurb}</p>
        </div>
      </Link>
    </div>
  );
}
