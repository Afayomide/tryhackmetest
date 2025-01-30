import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
import searchRouter from "./routes/search";

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

const db = mongoClient.db();

app.get("/hotel/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const collection = db.collection("hotels");
    await mongoClient.connect();

    const hotel = await collection.findOne({ _id: new ObjectId(id) });
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`API Server Started at ${PORT}`);
});
