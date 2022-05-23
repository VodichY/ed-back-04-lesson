import {AdminDBType} from '../repositories/types'
import {ObjectId} from 'mongodb'
import jwt, { SignOptions } from 'jsonwebtoken'
import {settings} from '../settings'

export const jwtUtility = {
    /**
     * @param user
     * @return Returns JWT-token
     */
    async createJWT(user: AdminDBType) {
        const payload = { userId: user._id }
        const secretOrPrivateKey = settings.JWT_SECRET;
        const options: SignOptions = {
            expiresIn: '1d',
        }

        const jwtToken = jwt.sign(payload, secretOrPrivateKey, options)

        return jwtToken
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
