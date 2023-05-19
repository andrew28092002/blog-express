import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

interface JwtPayload {
    email: string,
    id: string
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const authorization = req.headers.authorization
        
        if (!authorization){
            throw new Error('Unauthorized')
        }
        
        const token = authorization.split(" ")[1];

        let decodedData

        if (token){
            decodedData = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as JwtPayload
            req.cookies.userId = decodedData.id
        }

        next()
    } catch(e){
        console.log(e)
    }
}