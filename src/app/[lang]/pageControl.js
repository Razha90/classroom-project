'use client';

import Footer from "@/component/template/footer";
import Header from "@/component/template/header";
import { SessionProvider } from "next-auth/react";
import Main from "./main";
import { useState } from "react";

export default function PageControl({language, user}) {
  const [heightHeader, setHeightHeader] = useState(0);

  return (
    <>
      <SessionProvider>
        <Header language={language.general} setHeaderHeight={setHeightHeader}/>
      </SessionProvider>
      <Main language={language.main} headerHeight={heightHeader} />
      <Footer language={language.footer} />
    </>
  );
}
