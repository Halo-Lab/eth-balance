import { NextFunction, Request, Response } from 'express';
import { ApplicationException } from '../exceptions/ApplicationException';

export const errorHandler = async (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response> => {
    console.error('\x1b[31m', `ERROR caught:->>>>> ${err.stack}`, '\x1b[0m');
    if (err instanceof ApplicationException) {
        return res
            .status(err.status)
            .send({ name: err.name, message: err.message, status: err.status });
    } else {
        return res.status(500).send('Server error');
    }
};
