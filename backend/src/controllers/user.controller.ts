import bcrypt from "bcryptjs";
import { loginSchema, registerSchema, type LoginInput, type RegisterInput } from "../validations/user.validations.js"
import { type Request, type Response } from "express";
import prisma from "../config/db.js";
import { generateToken } from "../utils/jwt.js";


// Register

export const register = async (req: Request, res: Response) => {
    try {
        const { success, data, error } = registerSchema.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                success: false,
                error: error.issues
            });
        }

        const body: RegisterInput = data;

        const exists = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        });

        if (exists) {
            return res.status(409).json({
                success: false,
                message: "User Already Exists"
            });
        }

        const hashedPassword = await bcrypt.hash(body.password, 12);

        await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashedPassword
            }
        });

        return res.status(201).json({
            success: true,
            message: "User Registered"
        });
    } catch (error: unknown) {
        console.error("Register error: ", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
} 

// Login

export const login = async (req: Request, res: Response) =>{
    const { success, data, error } = loginSchema.safeParse(req.body);
    if(!success){
        return res.status(400).json({
            success: false,
            error: error.issues
        });
    }

    const body: LoginInput = data;

    const userExists = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    });

    if(!userExists){
        return res.status(401).json({
            success: false,
            message: "Invalid Email or Password"
        });
    }

    const checkPassword = await bcrypt.compare(body.password, userExists.password);
    if(!checkPassword){
        return res.status(401).json({
            success: false,
            message: "Invalid Email or Password"
        });
    }

    const token = generateToken(userExists.id);

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    });
    
    return res.json({
        success: true,
        message: "User Logged-In",
    });
}

// Logout 

export const logout = (req: Request, res: Response) =>{

    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    });

    return res.json({
        success: true,
        message: "Cookie Removed"
    });
}

// Get Me 

export const getMe = (req: Request, res: Response) =>{
    
    return res.json({
        success: true,
        data: req.user
    });
}