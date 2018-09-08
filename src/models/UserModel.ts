import { injectable } from 'inversify';
import { Repository } from 'typeorm';
import { UserDbSchema, UserDTO } from '../model/schema/UserSchema';

export interface IUserModel {
    /*findAll(): Promise<UserDTO[]>;

    create(addressDTO: UserDTO): Promise<UserDTO>;

    update(addressDTO: UserDTO): Promise<UserDTO>;

    find(id: string): Promise<UserDTO>;*/
}

@injectable()
export class UserModel implements IUserModel {

    private addressRepository: Repository<UserDbSchema>;

    constructor() {
        // this.addressRepository = connection.getRepository(UserDbSchema);
    }

    /*public async findAll(): Promise<UserDTO[]> {
        // return await this.addressRepository.find();
    }

    public async create(addressDTO: UserDTO): Promise<UserDTO> {
        // return await this.addressRepository.persist(addressDTO);
    }

    public async update(addressDTO: UserDTO): Promise<UserDTO> {
        // return await this.addressRepository.persist(addressDTO);
    }

    public async find(id: string): Promise<UserDTO> {
        // return await this.addressRepository.findOneById(id);
    }*/
}
