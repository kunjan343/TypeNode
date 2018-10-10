import { injectable } from 'inversify';
import { getRepository, ObjectID, UpdateResult } from 'typeorm';
import { IUser, UserSchema } from '../database/UserSchema';

/**
 * Define methods for user model
 */
export interface IUserModel {
    create(user: IUser): Promise<IUser>;

    searchByUsername(username: string): Promise<IUser>;

    searchAll(): Promise<IUser[]>;

    search(id: ObjectID): Promise<IUser>;

    update(id: ObjectID, data: object): Promise<UpdateResult>;

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

    /**
     * Search user by username
     * @param username
     * @returns     stored user object
     */
    public searchByUsername = (username: string): Promise<IUser> => {
        return getRepository(UserSchema).findOne({username});
    }

    /**
     * Search all users
     * @returns     users list
     */
    public searchAll = (): Promise<IUser[]> => {
        return getRepository(UserSchema).find();
    }

    /**
     * Search user by id
     * @returns     user object
     */
    public search = (id: ObjectID): Promise<IUser> => {
        return getRepository(UserSchema).findOne(id);
    }

    /**
     * Search user by id
     * @returns     user object
     */
    public update = (id: ObjectID, data: object): Promise<UpdateResult> => {
        return getRepository(UserSchema).update(id, data);
    }
}
