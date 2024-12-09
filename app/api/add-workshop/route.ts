import clientPromise from "@/lib/mongodb";
import { Db, Collection, InsertOneResult } from "mongodb";

export type Workshop = {
   _id?: string;
   workshopName: string;
   ownerName: string;
   address: string;
   state: string;
   city: string;
   phone: string;
   email: string;
   website: string;
   specializations: any[];
   description: string;
   termsAccepted: boolean;
};

export async function POST(req: Request) {
   if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Invalid method" }), {
         status: 405,
         headers: { "Content-Type": "application/json" },
      });
   }

   try {
      const bodyObject: Workshop = await req.json();
      const client = await clientPromise;

      const db: Db = client.db("autohelp");
      const collection: Collection<Workshop> = db.collection("workshops");

      const workshop: InsertOneResult<Workshop> = await collection.insertOne(
         bodyObject,
      );

      return new Response(JSON.stringify(workshop), {
         status: 201,
         headers: { "Content-Type": "application/json" },
      });
   } catch (error) {
      console.error("Error in POST handler:", error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
         status: 500,
         headers: { "Content-Type": "application/json" },
      });
   }
}
