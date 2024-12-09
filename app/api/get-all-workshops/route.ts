import clientPromise from "@/lib/mongodb";
import { Db, Collection } from "mongodb";
import { Workshop } from "../add-workshop/route";

export async function GET(req: Request) {
   if (req.method !== "GET") {
      return new Response("Method Not Allowed", {
         status: 405,
         headers: { "Content-Type": "application/json" },
      });
   }

   try {
      const client = await clientPromise;
      const db: Db = client.db("autohelp");

      const collection: Collection<Workshop> = db.collection("workshops");
      const data = await collection.find({}).toArray();

      return new Response(JSON.stringify(data), {
         status: 200,
         headers: { "Content-Type": "application/json" },
      });
   } catch (error) {
      console.error("Error -->:", error);
      return new Response("Internal Server Error", {
         status: 500,
         headers: { "Content-Type": "application/json" },
      });
   }
}
