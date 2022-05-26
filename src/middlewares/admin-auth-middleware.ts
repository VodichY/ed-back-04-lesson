import {NextFunction, Request, Response} from 'express'
import {jwtUtility} from "../application/jwt-utility";
import {adminsService} from "../domain/admins-service";

export const adminAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.sendStatus(401)
        return
    }


    const token = req.headers.authorization.split(' ')[1]
    const adminId = await jwtUtility.extractAdminIdFromToken(token)
    if(adminId) {
        req.admin = await adminsService.findUserById(adminId)
        next()
        return
    }

    res.send(401)
}
