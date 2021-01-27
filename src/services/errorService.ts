import { Request, Response, NextFunction, } from "express";

export class ErrorObject extends Error {
    readonly statusCode: number;

    readonly status: string;

    readonly data: Record<string, unknown>;

    constructor(code: number, message: string, data = null,) {
        super(message,);
        this.statusCode = code;
        this.status = "error";
        this.data = data;
    }

}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction,): void {
    if (err instanceof ErrorObject) {
        res.status(err.statusCode,).send({
            message: err.message,
            status: err.status,
            data: err.data,
        },);
    } else if (err.type && err.type === "entity.parse.failed") {
        res.status(err.status,).send({
            message: "Invalid JSON payload passed.",
            status: "error",
            data: null,
        },);
    } else {
        res.status(err.status || 500,).send({
            message: err.message,
            status: "error",
            data: null,
        },);
    }
    next();
}
