import { mongoClient } from "index";
import { Request, Response } from "express";



export const search = async (req: Request, res: Response) => {
  const { search } = req.query;

  try {
    const db = mongoClient.db();
    const collection = db.collection("hotels");
    const searchRegex = { $regex: search, $options: "i" };
    const filter = search
      ? {
          $or: [
            { chain_name: searchRegex },
            { hotel_name: searchRegex },
            { city: searchRegex },
            { country: searchRegex },
          ],
        }
      : {};
    const hotels = await collection.find(filter).toArray();

    const cities = await collection
      .aggregate([
        { $match: { city: searchRegex } },
        { $group: { _id: { city: "$city", country: "$country" } } },
        { $project: { _id: 0, city: "$_id.city", country: "$_id.country" } },
      ])
      .toArray();
    const countries = await collection.distinct("country", {
      country: searchRegex,
    });
    res.json({
      hotels,
      categorized: {
        cities,
        countries,
      },
    });
  } catch(error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const searchType = async (req: Request, res: Response) => {
  const { search } = req.query;
  const { type } = req.params;

  try {

    const db = mongoClient.db();
    const collection = db.collection("hotels");
  

    const filter = search
      ? {
          $or: [{ [type]: { $regex: search, $options: "i" } }],
        }
      : {};
    const hotels = await collection.find(filter).toArray();
    res.json({
      hotels,
    });
  }
  catch(error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
