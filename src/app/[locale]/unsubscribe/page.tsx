import { Metadata } from "next";
import UnsubscribeClient from "./UnsubscribeClient";

export const runtime = "edge";

interface UnsubscribePageProps {
  params: { locale: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

const metaTitles: Record<string, string> = {
  "zh-hk": "取消訂閱 | 智印港",
  en: "Unsubscribe | ZprintPro",
  ja: "配信停止 | ジープリント",
};

export async function generateStaticParams() {
  return [{ locale: "zh-hk" }, { locale: "en" }, { locale: "ja" }];
}

export async function generateMetadata({ params }: UnsubscribePageProps): Promise<Metadata> {
  const locale = metaTitles[params.locale] ? params.locale : "zh-hk";
  return { title: metaTitles[locale], robots: { index: false, follow: false } };
}

export default function UnsubscribePage({ params, searchParams }: UnsubscribePageProps) {
  const locale = ["zh-hk", "en", "ja"].includes(params.locale) ? params.locale : "zh-hk";
  const e = typeof searchParams?.e === "string" ? searchParams.e : "";
  return <UnsubscribeClient locale={locale} email={e} />;
}
