import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import {GenerateToken} from '../utils/token.js'

export const signUp = async (req, res) => {
    try {
        const { name, email, password, confirmPassword  } = req.body
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        const token = await GenerateToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "development" ? "strict" : "none",
            secure: process.env.NODE_ENV === "development" ? false : true
        })

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user
        })

    } catch (error) {
        console.log("Error in signup", error)
        return res.status(500).json({
            success: false,
            message: "Error in signup",
            error
        })
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body

        const user = await User.findOne({email})

        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const token = await GenerateToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "development" ? "strict" : "none",
            secure: process.env.NODE_ENV === "development" ? false : true
        })

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user
        })
    } catch (error) {
        console.log("Error in login", error)
        return res.status(500).json({
            success: false,
            message: "Error in login",
            error
        })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({
            success: true,
            message: "User logged out successfully"
        })

    } catch (error) {
        console.log("Error in logout", error)
        return res.status(500).json({
            success: false,
            message: "Error in logout",
            error
        })
    }
}