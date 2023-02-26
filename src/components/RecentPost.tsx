import Link from "next/link";

export function RecentPost(props: { slug: string; frontmatter: any }) {
  return (
    <div className="border border-gray-200 m-2 rounded-xl shadow-lg overflow-hidden flex flex-col">
      <Link href={`/post/${props.slug}`}>
        <h1 className="p-4 font-bold">{props.frontmatter.title}</h1>
        <p className="p-4">{props.frontmatter.date}</p>
      </Link>
    </div>
  );
}
