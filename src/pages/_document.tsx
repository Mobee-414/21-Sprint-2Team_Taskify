import { Html, Head, Main, NextScript } from "next/document";
import { pretendard } from "@/styles/fonts";

export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <body className={`antialiased ${pretendard.className}`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
