import type { AppProps } from "next/app";
import localFont from "next/font/local";
import "@/styles/globals.css";

const pretendard = localFont({
  src: [
    { path: "../../public/fonts/Pretendard-Bold.woff2", weight: "700" },
    { path: "../../public/fonts/Pretendard-ExtraBold.woff2", weight: "600" },
    { path: "../../public/fonts/Pretendard-Medium.woff2", weight: "500" },
    { path: "../../public/fonts/Pretendard-Regular.woff2", weight: "400" },
  ],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={pretendard.className}>
      <Component {...pageProps} />
    </main>
  );
}
