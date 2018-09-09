import { injectable } from 'inversify';
import { IUser } from '../database/schema/UserSchema';

export interface IUserModel {
    create(user: IUser): Promise<IUser>;
}

@injectable()
export class UserModel implements IUserModel {

    public create = (user: IUser): Promise<IUser> => {
        return new Promise<IUser>((resolve) => {
            resolve(user);
        });
    }
}
