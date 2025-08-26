import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";

// ===================== REGISTER =====================
export const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(401).json({
                success: false,
                message: "All fields are required."
            });
        }

        // ✅ check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({
                success: false,
                message: "Email is already registered."
            });
        }

        // ✅ hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // ✅ create new user
        const newUser = await User.create({
            fullName,
            email,
            password: hashPassword
        });

        // ✅ generate token
        const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

        return res.status(201)
            .cookie("token", token, { httpOnly: true, sameSite: "strict", maxAge: 24 * 60 * 60 * 1000 })
            .json({
                success: true,
                message: "Account created successfully."
            });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// ===================== LOGIN =====================
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;  // ✅ fixed: use email, not fullName

        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: "All fields are required.",
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(403).json({
                success: false,
                message: "Email or password is incorrect."
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(403).json({
                success: false,
                message: "Email or password is incorrect."
            });
        }
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
        return res.status(200)
        .cookie("token", token, { httpOnly: true, sameSite: "strict", maxAge: 24 * 60 * 60 * 1000 })
        .json({
            success: true,
            message: `Login successfully, welcome ${user.fullName}`
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// ===================== LOGOUT =====================
export const logOut = async (req, res) => {   // ✅ fixed: added req, res
    try {
        return res.status(200)
            .cookie('token', "", { maxAge: 0 })
            .json({
                success: true,
                message: "User logged out successfully."
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
