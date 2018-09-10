import { injectable } from 'inversify';
import { getRepository, InsertResult } from 'typeorm';
import { IUser, UserSchema } from '../database/UserSchema';

export interface IUserModel {
    create(user: IUser): Promise<IUser>;
}

@injectable()
export class UserModel implements IUserModel {

    public create = (user: IUser): Promise<IUser> => {
        return getRepository(UserSchema).save(user);
    }
}
