import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
   throw new Error("Please add your MongoDB URI to the .env file");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
   var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
   if (!globalThis._mongoClientPromise) {
      client = new MongoClient(uri);
      globalThis._mongoClientPromise = client.connect();
   }
   clientPromise = globalThis._mongoClientPromise;
} else {
   // In production, create a new client instance
   client = new MongoClient(uri);
   clientPromise = client.connect();
}

export default clientPromise;
