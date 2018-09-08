import { inject, injectable } from 'inversify';
import * as _ from 'lodash';
import { Address } from '../model/Address';
import { AddressDTO } from '../model/schema/AddressSchema';
import { AddressModel } from '../models/AddressModel';
import TYPES from '../types';

export interface IAddressService {
    /*getAddresses(): Promise<Address[]>;

    createAddress(address: Address): Promise<Address>;

    updateAddress(address: Address): Promise<Address>;

    getAddress(id: string): Promise<Address>;*/
}

@injectable()
export class AddressService implements IAddressService {
    @inject(TYPES.AddressModel)
    private addressModel: AddressModel;

    /*public async getAddresses(): Promise<Address[]> {
        /!*!// grab addresses from mongo
        const addressesMongo: Address[] = await this.addressRepositoryMongo.findAll().then((a) => a.map((dto: AddressDTO) => {
            return this.toAddressDTO(dto);
        }));

        // grab addresses from db
        const addressesDb: Address[] = await this.addressRepositoryDb.findAll().then((a2) => a2.map((dto: AddressDTO) => {
            return this.toAddressDTO(dto);
        }));

        return _.uniqBy(addressesMongo.concat(addressesDb), 'id');*!/
    }

    public async createAddress(address: Address): Promise<Address> {
        const addressDTO: AddressDTO = this.toAddress(address);

        const createdDTO: AddressDTO = await this.addressRepositoryMongo.create(addressDTO);

        // duplicates the address in the DB
        await this.addressRepositoryDb.create(await createdDTO);

        return await this.toAddressDTO(createdDTO);
    }

    public async updateAddress(address: Address): Promise<Address> {
        const addressDTO: AddressDTO = this.toAddress(address);

        const updated: AddressDTO = await this.addressRepositoryMongo.update(addressDTO);

        // update db address
        await this.addressRepositoryDb.update(updated);

        return await this.toAddressDTO(updated);
    }

    public async getAddress(id: string): Promise<Address> {
        let address = await this.addressRepositoryMongo.find(id).then((a) => {
            return this.toAddressDTO(a);
        });

        if (!address) {
            address = await this.addressRepositoryDb.find(id).then((a) => {
                return this.toAddressDTO(a);
            });
        }

        return address;
    }

    private toAddress(address: Address): AddressDTO {
        return {
            address1: address.getAddress1,
            address2: address.getAddress2,
            city: address.getCity,
            state: address.getState,
            zip: address.getZip,
            country: address.getCountry,
            _id: address.getId
        };
    }

    private toAddressDTO(addressDTO: AddressDTO): Address {
        return new Address(
          addressDTO.address1,
          addressDTO.address2,
          addressDTO.city,
          addressDTO.state,
          addressDTO.zip,
          addressDTO.country,
          addressDTO._id.toString());
    }*/
}
