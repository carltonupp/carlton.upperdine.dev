import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Carlton Upperdine</title>
      </Head>
      <div className="mx-auto w-10/12 md:w-8/12 xl:w-5/12">
        <div className="mt-5 text-2xl">
          <ul>
            <li className="text-3xl font-bold mb-5 text-center">
              Hello, I&apos;m Carlton!
            </li>
            <li className="mb-5">
              I&apos;m a software engineer based in the UK, having worked in the
              tech industry since 2011.
            </li>
            <li className="mb-5">
              My core languages are C# and TypeScript, but I believe in using
              the right tools for the job.
            </li>
            <li className="mb-5">
              Away from my computer, you&apos;ll find me obsessively
              watching UFC, failing at Latte art, and spending time with my
              fiancée and two cats.
            </li>
            <li>
              Check out my socials and blog for insights and experiences from my
              work as a software engineer. Cheers! 🚀
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
