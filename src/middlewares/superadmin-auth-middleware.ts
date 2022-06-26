import {NextFunction, Request, Response} from 'express'

export const superAdminAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // check Basic auth for login/pass pair: superadmin/12345
    const authDataBase64 = req.headers.authorization || ""; 
    const encodedAuth = `Basic ${Buffer.from('superadmin:12345', 'utf8').toString('base64')}`; 
    if( encodedAuth ===  authDataBase64) {
        next();
        return;
    }

    res.send(401)
}
