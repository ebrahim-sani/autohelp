import type { Metadata } from "next";
import "./../globals.css";
import Layout from "@/components/layout";

export const metadata: Metadata = {
   title: "AutoHelp | Chat",
   description: "",
};

export default function WLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <body>
         <Layout>{children}</Layout>
      </body>
   );
}
