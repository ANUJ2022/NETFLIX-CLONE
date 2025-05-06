import express from "express";
import { getSearchHistory, removeItemFromSearchHistory, saveSelectedToHistory, searchMovie, searchPerson, searchTV } from "../Controller/search.Controller.js";

const searchRouter = express();

searchRouter.get("/person/:query", searchPerson);
searchRouter.get("/tv/:query", searchTV);
searchRouter.get("/movie/:query", searchMovie);
searchRouter.post('/search/save', saveSelectedToHistory);


searchRouter.get("/history", getSearchHistory);
searchRouter.delete("/deleteHistory/:id", removeItemFromSearchHistory);



export default searchRouter;