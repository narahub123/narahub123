import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

export type MongoDB = Db;

export type ConnectCallback = (db: MongoDB) => void;

export const connectAndUseDB = async (
  callback: ConnectCallback,
  dbName: string,
  mongoUrl: string = process.env.REACT_APP_MONGODB_URL || ""
) => {
  let connection;
  try {
    connection = await MongoClient.connect(mongoUrl);
    const db: Db = connection.db(dbName);
    console.log("server is connecting to MongoDB");
    callback(db);
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
    throw error;
  }
};
