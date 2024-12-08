// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: {
  karmas?: mongoDB.Collection;
  karmaList?: mongoDB.Collection;
  tracker?: mongoDB.Collection;
} = {};

// Initialize Connection
export async function connectToDatabase() {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONN_STRING!
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const karmasCollection: mongoDB.Collection = db.collection(
    process.env.KARMAS_COLLECTION_NAME!
  );
  const karmaListCollection: mongoDB.Collection = db.collection(
    process.env.KARMA_LIST_COLLECTION_NAME!
  );
  const trackerCollection: mongoDB.Collection = db.collection(
    process.env.TRACKER_COLLECTION_NAME!
  );

  collections.karmas = karmasCollection;
  collections.karmaList = karmaListCollection;
  collections.tracker = trackerCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${
      (collections.karmas, collections.tracker)
    }}`
  );
}
