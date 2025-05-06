import express from "express";
import userRouter from "./Routes/User.route.js";
import { ENV_VAR } from "./Config/envVars.js";
import connectDB from "./Config/db.js";
import movieRouter from "./Routes/Movie.route.js";
import tvRouter from "./Routes/TV.route.js";
import { protectedRoute } from "./middleware/protectRoute.js";
import cookieParser from "cookie-parser";
import searchRouter from "./Routes/Search.Route.js";

const app = express();
const PORT = ENV_VAR.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/movie", protectedRoute, movieRouter);
app.use("/api/v1/tv", protectedRoute, tvRouter);
app.use("/api/v1/search",protectedRoute,searchRouter);



app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
    connectDB();
})
