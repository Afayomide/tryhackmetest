import express from "express";
const router = express.Router();
import { searchType, search } from "controllers/search";

router.route("/search").get(search);

router.route("/search/:type").get(searchType);


export default router;