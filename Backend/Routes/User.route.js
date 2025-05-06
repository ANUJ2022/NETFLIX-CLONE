
import express from "express";
import { login, logout, signUp } from "../Controller/User.controller.js";


const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post("/signUp", signUp);


export default userRouter;
