import { MongoClient } from "mongodb";
import { config } from "dotenv";

config();

let url = process.env.MONGODB_URL;
let db;

export const connectDb = (cb) => {
  let client = new MongoClient(url);
  client
    .connect()
    .then(() => {
      db = client.db();
      cb();
    })
    .catch((err) => {
      cb(err);
    });
};

export const getDb = () => {
  return db;
};
