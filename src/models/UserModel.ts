import { injectable } from 'inversify';
import { getRepository } from 'typeorm';
import { IUser, UserSchema } from '../database/UserSchema';

/**
 * Define methods for user model
 */
export interface IUserModel {
    create(user: IUser): Promise<IUser>;
}

/**
 * Implements user collection database operation functions
 */
@injectable()
export class UserModel implements IUserModel {

    /**
     * Create new user
     * @param user  user object
     * @returns     stored user object
     */
    public create = (user: IUser): Promise<IUser> => {
        return getRepository(UserSchema).save(user);
    }
}
