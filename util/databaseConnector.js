import { MongoClient } from "mongodb";
import "dotenv/config";

config();

let url = process.env.MONGODB_URL;
let db;

export const connectDb = () => {
  let client = new MongoClient(url);
  client.connect((err) => {
    if (err) {
      console.error("Error connecting to database", err);
      return;
    }
    db = client.db();
    console.log("Connected to database");
  });
};

export const getDb = () => {
  return db;
};
