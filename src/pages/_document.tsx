import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="keywords" content="title, meta, nextjs" />
        <meta name="author" content="Carlton Upperdine" />
      </Head>
      <GoogleAnalytics />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
