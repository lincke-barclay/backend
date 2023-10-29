import {NextFunction, Request, Response} from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): any {
    console.error(err)
    res.status(500).json("Something went wrong")
}