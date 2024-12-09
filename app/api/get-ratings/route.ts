import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
   const { searchParams } = new URL(req.url);
   const workshopId = searchParams.get("workshopId");

   if (!workshopId) {
      return NextResponse.json(
         { error: "Workshop ID is required" },
         { status: 400 },
      );
   }

   try {
      const client = await clientPromise;
      const db = client.db("autohelp");
      const collection = db.collection("ratings");

      const ratings = await collection
         .find({ workshopId: new ObjectId(workshopId) })
         .toArray();
      const averageRating =
         ratings.length > 0
            ? ratings.reduce((acc, curr) => acc + curr.rating, 0) /
              ratings.length
            : 0;

      return NextResponse.json({
         averageRating: parseFloat(averageRating.toFixed(1)),
         reviews: ratings.map(({ rating, review }) => ({ rating, review })),
      });
   } catch (error) {
      console.error("Error in GET /api/get-ratings:", error);
      return NextResponse.json(
         { error: "Internal Server Error" },
         { status: 500 },
      );
   }
}
