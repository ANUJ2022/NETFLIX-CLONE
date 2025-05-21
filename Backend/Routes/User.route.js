
import express from "express";
import { checkAuth, login, logout, signUp } from "../Controller/User.controller.js";
import { protectedRoute } from "../middleware/protectRoute.js";


const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post("/signUp", signUp);
userRouter.get("/checkAuth", protectedRoute, checkAuth);



export default userRouter;
