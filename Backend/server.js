import express from "express";
import userRouter from "./Routes/User.route.js";
import { ENV_VAR } from "./Config/envVars.js";
import connectDB from "./Config/db.js";
import movieRouter from "./Routes/Movie.route.js";
import cors from "cors";
import tvRouter from "./Routes/TV.route.js";
import { protectedRoute } from "./middleware/protectRoute.js";
import cookieParser from "cookie-parser";
import searchRouter from "./Routes/Search.Route.js";
import path from "path";

const app = express();
const PORT = ENV_VAR.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true               // if you're using cookies or HTTP-only tokens
}));

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/movie", protectedRoute, movieRouter);
app.use("/api/v1/tv", protectedRoute, tvRouter);
app.use("/api/v1/search", protectedRoute, searchRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "Frontend", "dist")));

    app.get('/*\w', (req, res) => {
        res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
    });
}



app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
    connectDB();
})
