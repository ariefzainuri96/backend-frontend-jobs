import { Response, Request } from "express"
import { handleError } from "../utils/helper"
import { IStandart } from "../interfaces/i_standart"

export function sendError(res: Response, status: number, err: string) {
    res.status(status).json({
        status: status,
        message: handleError(err)
    } as IStandart)
}

export function isText(data: unknown): data is string {
    return typeof data === 'string';
};