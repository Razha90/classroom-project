import { SignIn } from "@/component/SignIn";
import { getDictionary } from "@/lib/dictionary";
import Link from "next/link";

export default async function Page({params}) {
  const {lang} = await params;
  const dict = await getDictionary(lang);
  return (
    <div>
    <h1>Sign in</h1>
      <h1>{dict.title}</h1>
      <Link href={`/${lang}/login`} >Login</Link>
    </div>
  );
} 
