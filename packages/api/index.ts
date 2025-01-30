import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MongoClient } from "mongodb";
import searchRouter from "./routes/search";
import hotelRouter from "./routes/hotel"

dotenv.config();

if (process.env.NODE_ENV !== "production" && !process.env.DATABASE_URL) {
  await import("./db/startAndSeedMemoryDB");
}

const PORT = process.env.PORT || 3001;
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
const DATABASE_URL = process.env.DATABASE_URL;
export const mongoClient = new MongoClient(DATABASE_URL);
await mongoClient.connect();
console.log("Connected to MongoDB ✅");

console.log(DATABASE_URL);
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", searchRouter);
app.use("/", hotelRouter)

const db = mongoClient.db();


app.listen(PORT, () => {
  console.log(`API Server Started at ${PORT}`);
});
