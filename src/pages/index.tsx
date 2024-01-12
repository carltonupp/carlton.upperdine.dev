import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Carlton Upperdine</title>
      </Head>
      <div className="mx-auto w-10/12 md:w-8/12 xl:w-5/12">
        {/* <h2 className="text-3xl font-bold"></h2> */}
        <div className="mt-5 text-2xl">
          <ul>
            <li className="text-3xl font-bold mb-5 text-center">
              Hello, I'm Carlton!
            </li>
            <li className="mb-5">
              I am a Software Engineer based in the UK, and have been working in
              the tech industry since 2011.
            </li>
            <li className="mb-5">
              My primary languages that I use day-to-day are C# and TypeScript
              but I use whatever tools are required for the job.
            </li>
            <li className="mb-5">
              Outside of work I am a die-hard UFC fan, martial artist and I also
              play the guitar.
            </li>
            <li>
              On this page, you can find a link to my socials as well as my
              blog, where I share insights and talk about my experiences as a
              Software Engineer.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
