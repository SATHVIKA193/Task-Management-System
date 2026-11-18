
import { MongoClient } from "mongodb";

// Get MongoDB connection string
const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add MONGODB_URI to .env.local");
}

// Get database name
const dbName = process.env.MONGODB_DB;

if (!dbName) {
  throw new Error("Please add MONGODB_DB to .env.local");
}

// Store MongoDB client globally during development
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const client = new MongoClient(uri);

const clientPromise =
  global._mongoClientPromise ??
  client.connect();

if (process.env.NODE_ENV === "development") {
  global._mongoClientPromise = clientPromise;
}

// Return the database
export async function getDb() {
  const connectedClient = await clientPromise;

  return connectedClient.db(dbName);
}
