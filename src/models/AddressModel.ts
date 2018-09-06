import { injectable } from 'inversify';
import { Repository } from 'typeorm';
import { AddressDbSchema, AddressDTO } from '../model/schema/AddressSchema';

export interface IAddressModel {
    /*findAll(): Promise<AddressDTO[]>;

    create(addressDTO: AddressDTO): Promise<AddressDTO>;

    update(addressDTO: AddressDTO): Promise<AddressDTO>;

    find(id: string): Promise<AddressDTO>;*/
}

@injectable()
export class AddressModel implements IAddressModel {

    private addressRepository: Repository<AddressDbSchema>;

    constructor() {
        // this.addressRepository = connection.getRepository(AddressDbSchema);
    }

    /*public async findAll(): Promise<AddressDTO[]> {
        // return await this.addressRepository.find();
    }

    public async create(addressDTO: AddressDTO): Promise<AddressDTO> {
        // return await this.addressRepository.persist(addressDTO);
    }

    public async update(addressDTO: AddressDTO): Promise<AddressDTO> {
        // return await this.addressRepository.persist(addressDTO);
    }

    public async find(id: string): Promise<AddressDTO> {
        // return await this.addressRepository.findOneById(id);
    }*/
}
