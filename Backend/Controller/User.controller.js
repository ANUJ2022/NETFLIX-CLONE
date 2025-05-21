import { User } from "../Model/User.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.send(401).json({
                success: false,
                message: "All fields are required"
            })
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid credentials"
            })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(404).json({
                success: false,
                message: "Invalid credentials"
            })
        }
        generateToken(user._id, res);
        res.status(200).json({
            success: true,
            user: {
                ...user._doc,
                password: ""
            }
        })
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
const logout = async (req, res) => {
    try {
        res.clearCookie("jwt-netflix");
        res.status(200).json({
            success: true,
            message: "User logout successfully"
        })
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields required"
            })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "email is not valid"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            });
        }


        const existingUserByEmail = await User.findOne({ email: email });
        if (existingUserByEmail) {
            return res.status(400).json({
                success: false,
                message: "User already existed with the email"
            })
        }

        const existingUserByUsername = await User.findOne({ username: username });
        if (existingUserByUsername) {
            return res.status(400).json({
                success: false,
                message: "User already existed with the username"
            })
        }



        //generate hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        //selecting images
        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        const newUser = new User({
            username,
            email,
            image: image,
            password: hashPassword,
        })


        generateToken(newUser._id, res);
        await newUser.save();
        //remove password from response
        return res.status(201).json({
            success: true,
            user: {
                ...newUser._doc,
                password: ""
            },
        })

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const checkAuth = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }
        return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export { login, logout, signUp, checkAuth };