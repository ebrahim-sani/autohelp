import clientPromise from "@/lib/mongodb";
import { Db, Collection } from "mongodb";
import { Workshop } from "../add-workshop/route";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
   if (req.method !== "POST") {
      return new Response("Method Not Allowed", {
         status: 405,
         headers: { "Content-Type": "application/json" },
      });
   }

   try {
      const { id } = await req.json();
      if (!id) {
         return new Response("ID is required", {
            status: 400,
            headers: { "Content-Type": "application/json" },
         });
      }

      const client = await clientPromise;
      const db: Db = client.db("autohelp");

      const collection: Collection<Workshop> = db.collection("workshops");
      // @ts-ignore
      const workshop = await collection.findOne({ _id: new ObjectId(id) });

      // console.log(workshop);

      if (!workshop) {
         return new Response("Workshop not found", {
            status: 404,
            headers: { "Content-Type": "application/json" },
         });
      }

      return new Response(JSON.stringify(workshop), {
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
