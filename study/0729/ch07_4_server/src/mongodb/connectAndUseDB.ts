import { MongoClient, Db } from "mongodb";

export type MongoDB = Db;

export type ConnectCallback = (db: MongoDB) => void;

export const connectAndUseDB = async (
  callback: ConnectCallback,
  dbName: string,
  mongoUrl: string = process.env.REACT_APP_MONGODB_URL ||
    "mongodb://localhost:27017"
) => {
  let connection;
  try {
    // 몽고db에 연결
    connection = await MongoClient.connect(mongoUrl);

    const db: Db = connection.db(dbName); // use dbname
    console.log("server is connecting to MongoDB");
    callback(db);
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
    throw error;
  }
};
