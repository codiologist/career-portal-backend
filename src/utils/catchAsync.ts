import { Request, Response, NextFunction } from 'express';


interface Middleware {
    (req: Request, res: Response, next: NextFunction): Promise<void>;
}

export const catchAsync = (middelware: Middleware) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(middelware(req, res, next)).catch((error) => {
            next(error);
        });
    };
};