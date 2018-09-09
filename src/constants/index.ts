import { ConnectionOptions } from 'typeorm';
import { UserSchema } from '../database/schema/UserSchema';

declare const process;

export const DATABASE = {
    CONNECTION_OPTIONS: {
        type: 'mongodb',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 27017,
        ssl: process.env.DB_SSL === 'enable',
        username: process.env.DB_USERNAME || '',
        password: process.env.DB_PASSWORD || '',
        replicaSet: process.env.DB_REPLICASET || '',
        database: process.env.DB_NAME || 'typeorm-test',
        authSource: process.env.DB_AUTHSOURCE || '',
        logging: process.env.DB_LOGGING || false,
        synchronize: process.env.DB_SYNCRONIZE || true,
        entities: [
            UserSchema
        ]
    } as ConnectionOptions
};

export const APP = {
    PORT: process.env.PORT || 3000,
    ROUTE_PREFIX: process.env.ROUTE_PREFIX || '/api/v1/'
};

export const ROUTES = {
    USER: 'user'
};
