import Layout from "@/components/Layout";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as gtag from "@/core/google-analytics";
const isProduction = process.env.NODE_ENV === "production";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      if (isProduction) gtag.pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
