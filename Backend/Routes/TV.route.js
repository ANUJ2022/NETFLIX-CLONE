import express from "express";
import { getSimilarTVShows, getTrendingTVShow, getTVShowDetails, getTVShowsByCategory, getTVShowsTrailer } from "../Controller/tv.controller.js";


const tvRouter = express.Router();

tvRouter.get("/trending", getTrendingTVShow);
tvRouter.get("/:id/trailers", getTVShowsTrailer);
tvRouter.get("/:id/TVDetails", getTVShowDetails);
tvRouter.get("/:id/similar", getSimilarTVShows);
tvRouter.get("/:category", getTVShowsByCategory);


export default tvRouter;