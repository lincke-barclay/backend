import { NextFunction, Request, Response } from "express";
import { APIExposedError, Unauthenticated401Error } from "./apiExposedErrors";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): any {
    if (err instanceof APIExposedError) {
        res.status(err.code).json(err.jsonBody)
    } else {
        console.error(err)
        res.status(500).json("Something went wrong")
    }
}