import { injectable } from 'inversify';
import { Connection, createConnection, getConnection } from 'typeorm';
import { DATABASE } from '../constants/server';
import { INext, IReq, IReqFunc, IRes } from '../interfaces/express';
import { logger } from './logger';

export interface IDBConnection {
    connect(req: IReq, res: IRes, next: INext): IReqFunc;
}

@injectable()
export class DBConnection implements IDBConnection {
    public connect: IReqFunc = async (req: IReq, res: IRes, next: INext) => {
        // Skip database connection on live server
        try {
            // Check and move forward if connection is already established
            const connection: Connection = getConnection('default');
            if (connection.isConnected) {
                return next();
            }
        } catch (error) {
            logger.warn('DB : database connection offline');
        }
        try {
            // Create new connection
            logger.info('DB : trying to connect database....');
            await createConnection(DATABASE.CONNECTION_OPTIONS);
            logger.info('DB : Database connection established');
            return next();
        } catch (error) {
            logger.error('error', error);
            return next(error);
        }
    }
}
