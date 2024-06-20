import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"
import { isText, sendError } from "../common/common_functions";
// import { ICustomRequest } from "../interfaces/i_custom_request";

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    console.log(`${req.baseUrl} ${authHeader}`)

    if (authHeader && (isText(authHeader) && authHeader.startsWith('Bearer'))) {
        token = authHeader.split(' ')[1]
        const secret = process.env.ACCESS_TOKEN_SECRET

        console.log(`token => ${token}`)
        console.log(`JWT_SECRET => ${secret}`)

        jwt.verify(token, `${secret}`, (err, decoded) => {
            if (err) {
                return sendError(res, 401, 'User is not authorized')
            }

            req.user = decoded;
            console.log(decoded)

            next()
        })        
    }

    if (!token) {
            sendError(res, 401, 'User is not authorized or token is missing')
        }
}