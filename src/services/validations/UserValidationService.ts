import * as Boom from 'boom';
import { injectable } from 'inversify';
import * as _ from 'lodash';
import { INext, IReq, IReqFunc, IRes } from '../../interfaces/express';

export interface IUserValidationService {
    validateRegisterUser(req: IReq, res: IRes, next: INext): IReqFunc;
}

@injectable()
export class UserValidationService implements IUserValidationService {

    public validateRegisterUser: IReqFunc = (req: IReq, res: IRes, next: INext) => {
        const params = _.merge(req.body, req.params);
        req.params = params;
        if (_.isEmpty(params.username)) {
            return next(Boom.badRequest('Please enter username'));
        } else if (_.isEmpty(params.password)) {
            return next(Boom.badRequest('Please enter password'));
        }
        return next();
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
