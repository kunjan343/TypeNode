import { injectable } from 'inversify';
import { Connection, createConnection, getConnection } from 'typeorm';
import { DATABASE } from '../constants/server';
import { INext, IReq, IReqFunc, IRes } from '../interfaces/express';
import { logger } from './logger';

/**
 * Database class interface
 */
export interface IDBConnection {
    connect(req: IReq, res: IRes, next: INext): IReqFunc;
}

/**
 * Implements database connection methods
 */
@injectable()
export class DBConnection implements IDBConnection {
    /**
     * Crate connection with database or continue if connection is already established.
     * @param req   api request object
     * @param res   api request object
     * @param next  next function call
     * @returns     request handler function
     */
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
            // Create new database connection
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
