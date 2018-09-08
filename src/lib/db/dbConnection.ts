import { injectable } from 'inversify';
import { Connection, createConnection, getConnection } from 'typeorm';
import { INext, IReq, IReqFunc, IRes } from '../../interfaces/common/express';
import { AddressDbSchema } from '../../model/schema/AddressSchema';
import { logger } from '../../util/Logger';

export interface IDBConnection {
    connect(req: IReq, res: IRes, next: INext): IReqFunc;
}

@injectable()
export class DBConnection implements IDBConnection {
    public connect: IReqFunc = async (req: IReq, res: IRes, next: INext) => {
        try {
            const connection: Connection = getConnection('default');
            if (connection.isConnected) {
                return next();
            }
        } catch (error) {
            logger.info('connection not found, going to create new one');
        }
        try {
            await createConnection({
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
            return next();
        } catch (error) {
            logger.error('error', error);
            return next(error);
        }
    }
}
