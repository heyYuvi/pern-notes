import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/db.js";

type JwtPayload = {
    id: number
}

const protect = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const token = req.cookies.token;
    if(!token){
        return res.status(403).json({
            success: false,
            message: "Token Not Provided"
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const user = await prisma.user.findUnique({
        where: {
            id: decoded.id
        },
        select: {
            id: true,
            name: true,
            email: true,
        }
    });

    if(!user){
        return res.status(401).json({
            success: false,
            message: "User Not Found"
        });
    }

    req.user = user;
    next();

    }catch(error: unknown){
        console.log("Auth error: ", error);
        return res.status(403).json({
            success: false,
            message: "Invalid Token"
        });
    }
}

export default protect;