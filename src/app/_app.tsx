import type { AppProps } from "next/app";

export default function TokuApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
