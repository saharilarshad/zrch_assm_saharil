"use client";

import Header from "@/components/header/Header";
import Content from "@/components/content/Content";
import Footer from "@/components/footer/Footer";
import { headerData } from "@/lib/header";
import { footerData } from "@/lib/footer";

export default function Home() {


  return (
    <div>
      <>
        <Header data={headerData} />
        <Content />
        <Footer data={footerData} />
      </>
    </div>
  );
}
