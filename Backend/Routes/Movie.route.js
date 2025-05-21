import express from "express";
import { getMovieDetails, getMoviesByCategory, getMovieTrailer, getSimilarMovies, getTrendingMovie } from "../Controller/movie.controller.js";

const movieRouter = express.Router();

movieRouter.get("/trending", getTrendingMovie);
movieRouter.get("/:id/trailers", getMovieTrailer);
movieRouter.get("/:id/details", getMovieDetails);
movieRouter.get("/:id/similar", getSimilarMovies);
movieRouter.get("/:category", getMoviesByCategory);


export default movieRouter;