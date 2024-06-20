import mongoose from "mongoose";

export function handleError(error: any | unknown): string {
    if (error instanceof Error) return error.message

    return `${error}`
}

export function handleStatus(error: any | unknown): number {
    return error instanceof mongoose.Error.ValidationError ? 400 : 500;
}