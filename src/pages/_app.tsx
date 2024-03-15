import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";
import NextTopLoader from "nextjs-toploader";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextTopLoader color="#0d83fd" showSpinner={false} />
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
