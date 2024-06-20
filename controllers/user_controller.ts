import { Request, Response } from "express"
import User from "../models/user_model"
import { IStandart } from "../interfaces/i_standart"
import { handleError } from "../utils/helper"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { sendError } from "../common/common_functions";

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const userNotAvailable = await User.findOne({ email })

        if (userNotAvailable) {
            return sendError(res, 400, 'Email already used!')
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            email: email,
            password: hashedPassword
        })

        if (user) {
            res.status(200).json({
                message: "Register Success",
                status: 200,
                data: {
                    id: user.id,
                    email: user.email
                }
            } as IStandart)
        } else {
            sendError(res, 400, 'User data is not valid')
        }
    } catch (error) {
        sendError(res, 500, handleError(error))
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return sendError(res, 400, "All fields are mandatory")
        }

        const user = await User.findOne({ email })

        // compare password with hash password
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                {
                    email: user.email,
                    id: user.id
                },
                `${process.env.ACCESS_TOKEN_SECRET}`,
                {
                    expiresIn: '15m'
                }
            )

            res.status(200).json({
                status: 200,
                message: 'Login Success',
                data: token
            } as IStandart)
        } else {
            sendError(res, 401, 'Email or Password is not valid')
        }
    } catch (error) {
        sendError(res, 500, handleError(error))
    }
}

export const current = async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            status: 200,
            message: 'Get Current Profile Success',
            data: req.user
        } as IStandart)
    } catch (error) {
        sendError(res, 500, handleError(error))
    }
}