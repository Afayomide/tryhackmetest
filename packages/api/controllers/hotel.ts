import { mongoClient } from "index";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";



export const getHotelInfo = ( async (req: Request, res:Response) => {
  const { id } = req.params;

  try {
    const db = mongoClient.db();

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