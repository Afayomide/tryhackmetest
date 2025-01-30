import express from "express";
const router = express.Router();
import { getHotelInfo } from "controllers/hotel";

router.route("/hotel/:id").get(getHotelInfo);



export default router;