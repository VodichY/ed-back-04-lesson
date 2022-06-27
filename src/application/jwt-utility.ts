import {AdminDBType} from '../repositories/types'
import {ObjectId} from 'mongodb'
import jwt, {SignOptions} from 'jsonwebtoken'
import {settings} from '../settings'

export const jwtUtility = {
    /**
     * @param user
     * @return Returns JWT-token
     */
    async createJWT(user: AdminDBType) {
        const payLoad = {userId: user._id};
        const secretKey = settings.JWT_SECRET;
        const options: SignOptions = {
            expiresIn: '1h'
        };
        const token = jwt.sign(payLoad, secretKey, options);
        return token
    },
    async extractAdminIdFromToken(token: string): Promise<ObjectId | null> {
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET)
            return new ObjectId(result.adminId)
        } catch (error) {
            return null
        }
    }
}
