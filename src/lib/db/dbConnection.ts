import { injectable } from 'inversify';
import { Connection, createConnection } from 'typeorm';
import { AddressDbSchema } from '../../model/schema/AddressSchema';

export interface IDBConnection {
    connect(): Promise<Connection>;
}

@injectable()
export class DBConnection implements IDBConnection {
    public connect(): Promise<Connection> {
        return createConnection({
            type: 'mongodb',
            host: 'localhost',
            port: 27017,
            database: 'typeorm-test',
            logging: true,
            synchronize: true,
            entities: [
                AddressDbSchema
            ]
        });
    }
}
