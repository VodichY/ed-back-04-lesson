import {NextFunction, Request, Response} from 'express'
import { jwtUtility } from '../application/jwt-utility';
import { adminsService } from '../domain/admins-service';

export const adminAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const authorization = req.headers.authorization;
    if (!authorization) {
        res.sendStatus(401);
        return;
    }

    const token = authorization.split(' ')[1];
    const adminId = await jwtUtility.extractAdminIdFromToken(token);
    if(!adminId) {
        res.sendStatus(401);
        return;
    }

    const user = await adminsService.findUserById(adminId);
    if(!user) {
        res.sendStatus(401);
        return;
    }
    
    req.admin = user;
    next();
}
