import jwt from "jsonwebtoken";
import { ENV_VAR } from "../Config/envVars.js";

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, ENV_VAR.JWT_SECRET, { expiresIn: "15d" });
    res.cookie("jwt-netflix", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,//prevents XSS attack cross-site scripting attack,make it not to be accessed byy JS
        sameSite: "strict",// CSRF attacks cross-site request forgery attacks
        secure: ENV_VAR.NODE_ENV !== "development"
    })
    return token;
}