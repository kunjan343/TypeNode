import { ConnectionOptions } from 'typeorm';
import { UserSchema } from '../database/UserSchema';
import { DefaultSchema } from '../database/DefaultSchema';

declare const process;

/**
 * Database connection option object
 */

export const DATABASE = {
    CONNECTION_OPTIONS: {
        type: 'mongodb',
        url: process.env.DB_URL || 'mongodb://localhost:27017/test',
        entities: [
            DefaultSchema,
            UserSchema
        ]
    } as ConnectionOptions
};

/**
 * Default app server constants
 */
export const APP = {
    PORT: process.env.PORT || 3000,
    ROUTE_PREFIX: process.env.ROUTE_PREFIX || '/api/v1/'
};

/**
 * Each route prefix name
 */
export const ROUTES = {
    USER: 'users'
};

/**
 * Default app server messages
 */
export const MESSAGE = {
    INVALID_ROUTE: 'Invalid request',
    SERVER_LISTENING: 'Sample server is listening!',
    APP_LISTEN: 'App listening on port ' + APP.PORT + '!\n'
};
