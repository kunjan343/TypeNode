import { injectable } from 'inversify';
import { Connection, createConnection, Repository } from 'typeorm';
import { AddressDbSchema, AddressDTO } from '../model/AddressSchema';
import { logger } from '../util/Logger';

export interface AddressRepository {
    findAll(): Promise<AddressDTO[]>;

    create(addressDTO: AddressDTO): Promise<AddressDTO>;

    update(addressDTO: AddressDTO): Promise<AddressDTO>;

    find(id: string): Promise<AddressDTO>;
}

@injectable()
export class AddressRepositoryImplDb implements AddressRepository {
    private static connect(): Promise<Connection> {
        return createConnection({
            driver: {
                type: 'sqlite',
                storage: 'tmp/sqlitedb.db'
            },
            logging: {
                logQueries: true,
                logSchemaCreation: true
            },
            autoSchemaSync: true,
            entities: [
                AddressDbSchema
            ]
        });
    }

    private addressRepository: Repository<AddressDbSchema>;

    constructor() {
        this.connect().then(async (connection) => {
            this.addressRepository = connection.getRepository(AddressDbSchema);
        }).catch((err) => logger.error('Cannot connect to database', err));
    }

    public async findAll(): Promise<AddressDTO[]> {
        return await this.addressRepository.find();
    }

    public async create(addressDTO: AddressDTO): Promise<AddressDTO> {
        return await this.addressRepository.persist(addressDTO);
    }

    public async update(addressDTO: AddressDTO): Promise<AddressDTO> {
        return await this.addressRepository.persist(addressDTO);
    }

    public async find(id: string): Promise<AddressDTO> {
        return await this.addressRepository.findOneById(id);
    }
}
