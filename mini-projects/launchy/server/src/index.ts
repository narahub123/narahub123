import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const hostname = process.env.REACT_APP_BASE_URL || "";
const PORT = process.env.REACT_APP_PORT || 3000;

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`url=${req.url}, method=${req.method}`);
  next();
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log("now listening to ", PORT);
});
