import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { AuthProvider } from "@/contexts/AuthProvider";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Taskify | 스마트한 일정 관리와 팀 협업</title>
        <meta
          name="description"
          content="Taskify와 함께 가족, 회사 동료와 일정을 공유하고 할 일을 완벽하게 관리하세요. 대시보드 기반의 효율적인 협업 툴을 경험해보세요."
        />
        {/* 파비콘 */}
        <link rel="icon" href="/icons/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        {/* Open Graph (SNS 공유용) */}
        <meta
          property="og:title"
          content="Taskify - 스마트한 일정 관리와 팀 협업"
        />
        <meta
          property="og:description"
          content="멤버 초대부터 드래그 앤 드랍 일정 관리까지, 우리만의 커뮤니티에서 할 일을 유기적으로 관리해보세요."
        />
        <meta property="og:image" content="/images/og_image.png" />
        <meta property="og:url" content="/" />{" "}
        {/* 배포 후 실제 도메인 주소로 변경 권장 */}
        <meta property="og:type" content="website" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Taskify - 스마트한 일정 관리와 팀 협업"
        />
        <meta
          name="twitter:description"
          content="다양한 커뮤니티를 생성하고 할 일 목록을 공유하며 안정적인 프로젝트 관리를 시작해보세요."
        />
        <meta name="twitter:image" content="/images/og_image.png" />
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
