import { Request } from "express"

export interface IProductRequest extends Request {
    user_id: string
    name: string
    quantity: number
    price: number
}