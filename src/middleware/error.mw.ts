import { NextFunction, Request, Response } from "express";

const errorHandler = ( error: Error, req: Request, res: Response, next: NextFunction ) => {
    console.log(error.stack)
    res.status(500).json({error: true, data: null, message: error.message})
}

export default errorHandler;