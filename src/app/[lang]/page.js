"use server";

import { getDictionary } from "@/lib/dictionary";
import { headers } from "next/headers";
import PageControl from "./pageControl";

export default async function Page({ params }) {
  const { lang } = await params;
  const language = await getDictionary(lang);
  const header = await headers();
  const tokenAPI = header.get("X-Token-API");

  return (
    <>
      <PageControl language={language} />
      {/* <h2>{language.home.plan1.title}</h2>
      <Link href={`/${lang}/login`}>Login</Link>
      <GetCheck tokenAPI={tokenAPI} /> */}
    </>
  );
}
