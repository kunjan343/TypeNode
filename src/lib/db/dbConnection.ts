import { injectable } from 'inversify';
import { Connection, createConnection, getConnection } from 'typeorm';
import { INext, IReq, IReqFunc, IRes } from '../../interfaces/common/express';
import { UserSchema } from '../../model/schema/UserSchema';
import { logger } from '../../util/Logger';

export interface IDBConnection {
    connect(req: IReq, res: IRes, next: INext): IReqFunc;
}

@injectable()
export class DBConnection implements IDBConnection {
    public connect: IReqFunc = async (req: IReq, res: IRes, next: INext) => {
        try {
            // Check and move forward if connection is already established
            const connection: Connection = getConnection('default');
            if (connection.isConnected) {
                return next();
            }
        } catch (error) {
            logger.info('connection is not active, trying to create new one');
        }
        try {
            // Create new connection
            await createConnection({
                type: 'mongodb',
                host: 'localhost',
                port: 27017,
                database: 'typeorm-test',
                logging: true,
                synchronize: true,
                entities: [
                    UserSchema
                ]
            });
            logger.info('Database connection established');
            return next();
        } catch (error) {
            logger.error('error', error);
            return next(error);
        }
    }
}
