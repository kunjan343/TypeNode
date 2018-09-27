import { inject, injectable } from 'inversify';
import { FIELDS } from '../../constants/model';
import { IUser } from '../../database/UserSchema';
import { INext, IReq, IReqFunc, IRes } from '../../interfaces/express';
import { logger } from '../../lib/logger';
import { ObjectHandler } from '../../lib/objectHandler';
import { UserModel } from '../../models/UserModel';
import TYPES from '../../types';
import { USER_MESSAGE } from '../../constants/message/user.message';

export interface IUserOpsService {
    createUser(req: IReq, res: IRes, next: INext): IReqFunc;
}

@injectable()
export class UserOpsService implements IUserOpsService {
    // Injectable
    @inject(TYPES.UserModel) private userModel: UserModel;
    @inject(TYPES.ObjectHandler) private objectHandler: ObjectHandler;

    public createUser: IReqFunc = async (req: IReq, res: IRes, next: INext) => {
        try {
            const user: IUser = this.objectHandler.filterObject(req.params, FIELDS.USER);
            await this.userModel.create(user);
            req.userStore = {message: USER_MESSAGE.SUCCESS.CREATE};
            return next();
        } catch (error) {
            logger.error('createUser', error);
            return next(error);
        }
    }

    /*public async getUseres(): Promise<User[]> {
        /!*!// grab addresses from mongo
        const addressesMongo: User[] = await this.addressRepositoryMongo.findAll().then((a) => a.map((dto: UserDTO) => {
            return this.toUserDTO(dto);
        }));

        // grab addresses from db
        const addressesDb: User[] = await this.addressRepositoryDb.findAll().then((a2) => a2.map((dto: UserDTO) => {
            return this.toUserDTO(dto);
        }));

        return _.uniqBy(addressesMongo.concat(addressesDb), 'id');*!/
    }

    public async updateUser(address: User): Promise<User> {
        const addressDTO: UserDTO = this.toUser(address);

        const updated: UserDTO = await this.addressRepositoryMongo.update(addressDTO);

        // update db address
        await this.addressRepositoryDb.update(updated);

        return await this.toUserDTO(updated);
    }

    public async getUser(id: string): Promise<User> {
        let address = await this.addressRepositoryMongo.find(id).then((a) => {
            return this.toUserDTO(a);
        });

        if (!address) {
            address = await this.addressRepositoryDb.find(id).then((a) => {
                return this.toUserDTO(a);
            });
        }

        return address;
    }
    */
}
