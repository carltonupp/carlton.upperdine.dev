import Link from "next/link";

interface FrontMatter {
  blurb: string;
  date: string;
  title: string;
}

interface RecentPostProps {
  slug: string;
  frontmatter: FrontMatter;
}

export default function RecentPost({ slug, frontmatter }: RecentPostProps) {
  return (
    <div className="border border-gray-200 m-2 rounded-xl shadow-lg overflow-hidden flex flex-col">
      <Link href={`/post/${slug}`} id="">
        <div className="p-4 text-center">
          <h1 className="font-extrabold text-xl">{frontmatter.title}</h1>
          <p className="text-sm font-semibold border-b-2">
            Published: {new Date(frontmatter.date).toDateString()}
          </p>
          <p>{frontmatter.blurb}</p>
        </div>
      </Link>
    </div>
  );
}
