import { Button } from "@/components/ui/button";
import { MessageSquare, Wrench, ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
// import { Collection, Db, InsertManyResult } from "mongodb";
// import { dummyWorkshops } from "@/utils/data";
// import clientPromise from "@/lib/mongodb";
// import { Workshop } from "./api/add-workshop/route";

export default async function Home() {
   // try {
   //    const client = await clientPromise;
   //    const db: Db = client.db("autohelp");
   //    const collection: Collection<Workshop> = db.collection("workshops");

   //    console.log("Seeding database with dummy workshop data...");
   //    // @ts-ignore
   //    const result: InsertManyResult<Workshop>[] = await collection.insertMany(
   //       dummyWorkshops,
   //    );
   //    console.log(`Inserted ${result.length} workshop records.`);
   // } catch (error) {
   //    console.error("Error seeding database:", error);
   // }

   return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 relative overflow-hidden">
         {/* Decorative elements */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(25,25,25,0.5),transparent_60%)]" />
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(25,25,25,0.5),transparent_60%)]" />

         {/* Navigation */}
         <header className="relative z-10">
            <div className="container mx-auto px-4 py-4">
               <nav className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <Wrench className="h-8 w-8 text-blue-500" />
                     <span className="text-2xl font-bold text-white">
                        AutoHelp
                     </span>
                  </div>

                  <Link href="/register-workshop">
                     <div className="hidden md:block">
                        <Button className="bg-blue-500">
                           <Wrench className="mr-2 h-5 w-5" />
                           Register Workshop
                        </Button>
                     </div>
                  </Link>

                  <Button variant="ghost" size="icon" className="md:hidden">
                     <Menu className="h-6 w-6 text-white" />
                  </Button>
               </nav>
            </div>
         </header>

         {/* Hero Section */}
         <main className="relative z-10">
            <div className="container mx-auto px-4 py-20 md:py-32">
               <div className="max-w-4xl mx-auto text-center">
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                     Intelligent Car Repair System
                     <span className="block text-blue-400">Made Simple.</span>
                  </h1>
                  <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed">
                     Advanced diagnostics and maintenance powered by AI. Connect
                     with certified workshops and get real-time assistance for
                     your vehicle.
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                     <Link href="/chat">
                        <Button
                           size="lg"
                           className="group relative overflow-hidden bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg"
                        >
                           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                           <MessageSquare className="mr-2 h-5 w-5" />
                           Chat with AI Assistant
                        </Button>
                     </Link>

                     <Link href="/workshops">
                        <Button
                           size="lg"
                           variant="outline"
                           className="group relative text-blue-700 hover:text-white overflow-hidden border-2 hover:border-blue-500 hover:bg-blue-500 px-8 py-6 text-lg"
                        >
                           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                           <Wrench className="mr-2 h-5 w-5" /> Workshops
                        </Button>
                     </Link>
                  </div>
               </div>

               {/* Scroll Indicator */}
               <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                  <ChevronDown className="h-8 w-8 text-slate-400" />
               </div>
            </div>
         </main>
      </div>
   );
}
