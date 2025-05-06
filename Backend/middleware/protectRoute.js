import jwt from "jsonwebtoken";
import { ENV_VAR } from "../Config/envVars.js";
import { User } from "../Model/User.model.js";


export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies["jwt-netflix"];
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized - No Token Provided" })
        }

        const decoded = jwt.verify(token, ENV_VAR.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" })
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectedRoutes:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }


}