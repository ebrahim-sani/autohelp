import { Collection, Db, InsertManyResult } from "mongodb";
import { Workshop } from "./app/api/add-workshop/route";
import clientPromise from "./lib/mongodb";
import { dummyWorkshops } from "./utils/data";

async function seedDatabase() {
   try {
      const client = await clientPromise;
      const db: Db = client.db("autohelp");
      const collection: Collection<Workshop> = db.collection("workshops");

      const count = await collection.countDocuments();
      if (count === 0) {
         console.log("Seeding database with dummy workshop data...");
         // @ts-ignore
         const result: InsertManyResult<Workshop>[] =
            await collection.insertMany(dummyWorkshops);
         console.log(`Inserted ${result.length} workshop records.`);
      } else {
         console.log("The collection already has data. Skipping seed...");
      }
   } catch (error) {
      console.error("Error seeding database:", error);
   }
}

seedDatabase();
