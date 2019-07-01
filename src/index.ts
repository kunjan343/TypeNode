import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import 'reflect-metadata';
import { APP, MESSAGE } from './constants/server';
import { IRoutes } from './interfaces/IRoutes';
import container from './inversify.config';
import { DBConnection } from './lib/dbConnection';
import { logger } from './lib/logger';
import { RequestHooks } from './lib/requestHooks';
import TYPES from './types';

declare const process;

/**
 * Get database class access from container
 */
const database = container.resolve(DBConnection);
/**
 * Get middleware class access from container
 */
const middleware = container.resolve(RequestHooks);

/**
 * Create express application server
 */
const app: express.Application = express();

/**
 * Let express support JSON bodies
 */
app.use(bodyParser.json());

/**
 * Allow server to accept cross-origin-requests
 */
app.use(cors());

/**
 * Perform pre request execution operations
 */
app.use(middleware.handleRequest);

/**
 * Check and Connect database on each request
 */
app.use(database.connect);

/**
 * Collect all routes from container and register classes with application
 */
const routes: IRoutes[] = container.getAll<IRoutes>(TYPES.Route);
routes.forEach((route) => route.register(app));

/**
 * Handle api error response
 */
app.use(middleware.handleErrorResponse);

/**
 * Handle success response
 */
app.use(middleware.handleResponse);

/**
 * Handle invalid route error
 */
app.use(middleware.handle500ErrorResponse);

/**
 * Start express server on given port
 */
app.listen(APP.PORT, () => {
    logger.info(MESSAGE.APP_LISTEN);
});

/**
 * Handle process level errors
 */
process.on('uncaughtException', (err) => {
    logger.error('uncaughtException', err);
    process.exit(1);
});

export { app };
