import jwt from 'jsonwebtoken';

import { catchAsync } from '../utils/catchAsync';
import { TAuthGuard } from '../utils/constant/auth.Constant';

// Extend the Request interface to include the user property
declare module 'express-serve-static-core' {
    interface Request {
        user?: jwt.JwtPayload | string;
    }
}




export const auth = (role: TAuthGuard) => {

    return catchAsync(async (req, res, next) => {

        const token = req.headers.authorization?.split(" ")[1];
       
        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }   
        // Verify the token and extract user information
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        if (!decoded || typeof decoded === 'string') {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        // Check if the user has the required role
        const userRole = (decoded as jwt.JwtPayload).role;


        if (userRole !== role) {
            res.status(403).json({ message: "Forbidden" });
            return;
        }    
        // Attach user information to the request object
        req.user = decoded;
        // Call the next middleware or route handler    
        return next();
    })
}