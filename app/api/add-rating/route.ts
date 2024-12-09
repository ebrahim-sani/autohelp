import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
   if (req.method !== "POST") {
      return NextResponse.json(
         { error: "Method not allowed" },
         { status: 405 },
      );
   }

   try {
      const { workshopId, rating, review } = await req.json();
      const client = await clientPromise;
      const db = client.db("autohelp");
      const collection = db.collection("ratings");

      const result = await collection.insertOne({
         workshopId: new ObjectId(workshopId),
         rating,
         review,
         createdAt: new Date(),
      });

      return NextResponse.json(
         { success: true, id: result.insertedId },
         { status: 201 },
      );
   } catch (error) {
      console.error("Error in POST /api/add-rating:", error);
      return NextResponse.json(
         { error: "Internal Server Error" },
         { status: 500 },
      );
   }
}
