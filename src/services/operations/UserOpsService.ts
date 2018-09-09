import { inject, injectable } from 'inversify';
import { IUser } from '../../database/schema/UserSchema';
import { INext, IReq, IReqFunc, IRes } from '../../interfaces/express';
import { logger } from '../../lib/logger';
import { UserModel } from '../../models/UserModel';
import TYPES from '../../types';

export interface IUserOpsService {
    createUser(req: IReq, res: IRes, next: INext): IReqFunc;
}

@injectable()
export class UserOpsService implements IUserOpsService {
    @inject(TYPES.UserModel) private userModel: UserModel;

    public createUser: IReqFunc = async (req: IReq, res: IRes, next: INext) => {
        try {
            const params = req.params;
            const user: IUser = {
                username: params.username,
                password: params.password
            };
            await this.userModel.create(user);
            req.userStore = {message: 'User registered'};
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

    public async createUser(address: User): Promise<User> {
        const addressDTO: UserDTO = this.toUser(address);

        const createdDTO: UserDTO = await this.addressRepositoryMongo.create(addressDTO);

        // duplicates the address in the DB
        await this.addressRepositoryDb.create(await createdDTO);

        return await this.toUserDTO(createdDTO);
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

    private toUser(address: User): UserDTO {
        return {
            address1: address.getUser1,
            address2: address.getUser2,
            city: address.getCity,
            state: address.getState,
            zip: address.getZip,
            country: address.getCountry,
            _id: address.getId
        };
    }

    private toUserDTO(addressDTO: UserDTO): User {
        return new User(
          addressDTO.address1,
          addressDTO.address2,
          addressDTO.city,
          addressDTO.state,
          addressDTO.zip,
          addressDTO.country,
          addressDTO._id.toString());
    }*/
}
