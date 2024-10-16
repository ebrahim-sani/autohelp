import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {
   Bird,
   Book,
   Bot,
   Code2,
   CornerDownLeft,
   LifeBuoy,
   Mic,
   Paperclip,
   Rabbit,
   Settings,
   Settings2,
   Share,
   SquareUser,
   Triangle,
   Turtle,
   UserRound,
   Wrench,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
   Drawer,
   DrawerContent,
   DrawerDescription,
   DrawerHeader,
   DrawerTitle,
   DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

const geistSans = localFont({
   src: "./fonts/GeistVF.woff",
   variable: "--font-geist-sans",
   weight: "100 900",
});
const geistMono = localFont({
   src: "./fonts/GeistMonoVF.woff",
   variable: "--font-geist-mono",
   weight: "100 900",
});

export const metadata: Metadata = {
   title: "AutoHelp",
   description: "",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
         >
            <div className="grid h-screen w-full pl-[53px]">
               <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
                  <div className="border-b p-2">
                     <Button variant="outline" size="icon" aria-label="Home">
                        <Triangle className="size-5 fill-foreground" />
                     </Button>
                  </div>
                  <nav className="grid gap-1 p-2">
                     <TooltipProvider>
                        <Tooltip>
                           <Link href="/">
                              <TooltipTrigger asChild>
                                 <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-lg"
                                    aria-label="Models"
                                 >
                                    <Bot className="size-5" />
                                 </Button>
                              </TooltipTrigger>
                           </Link>
                           <TooltipContent side="right" sideOffset={5}>
                              Chat
                           </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                           <Link href="/workshops">
                              <TooltipTrigger asChild>
                                 <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-lg"
                                    aria-label="API"
                                 >
                                    <Wrench className="size-5" />
                                 </Button>
                              </TooltipTrigger>
                           </Link>
                           <TooltipContent side="right" sideOffset={5}>
                              Workshops
                           </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                           <TooltipTrigger asChild>
                              <Button
                                 variant="ghost"
                                 size="icon"
                                 className="rounded-lg"
                                 aria-label="Documentation"
                              >
                                 <Book className="size-5" />
                              </Button>
                           </TooltipTrigger>
                           <TooltipContent side="right" sideOffset={5}>
                              Documentation
                           </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                           <TooltipTrigger asChild>
                              <Button
                                 variant="ghost"
                                 size="icon"
                                 className="rounded-lg"
                                 aria-label="Settings"
                              >
                                 <Settings2 className="size-5" />
                              </Button>
                           </TooltipTrigger>
                           <TooltipContent side="right" sideOffset={5}>
                              Settings
                           </TooltipContent>
                        </Tooltip>
                     </TooltipProvider>
                  </nav>
                  <nav className="mt-auto grid gap-1 p-2">
                     <TooltipProvider>
                        <Tooltip>
                           <TooltipTrigger asChild>
                              <Button
                                 variant="ghost"
                                 size="icon"
                                 className="mt-auto rounded-lg"
                                 aria-label="Account"
                              >
                                 <UserRound className="size-5" />
                              </Button>
                           </TooltipTrigger>
                           <TooltipContent side="right" sideOffset={5}>
                              Account
                           </TooltipContent>
                        </Tooltip>
                     </TooltipProvider>
                  </nav>
               </aside>
               <div className="flex flex-1 h-full flex-col w-full">
                  <header className="sticky top-0 z-10 bg-white flex h-[53px] items-center gap-1 border-b px-4">
                     <h1 className="text-xl font-semibold">AutoHelp</h1>
                     <Button
                        variant="outline"
                        size="sm"
                        className="ml-auto gap-1.5 text-sm"
                     >
                        <Share className="size-3.5" />
                        Share
                     </Button>
                  </header>
                  {children}
               </div>
            </div>
         </body>
      </html>
   );
}
