import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import 'reflect-metadata';
import { APP } from './constants/index';
import { IRoutes } from './interfaces/route/IRoutes';
import container from './inversify.config';
import { DBConnection } from './lib/db/dbConnection';
import { RequestHooks } from './lib/middleware/requestHooks';
import TYPES from './types';
import { logger } from './util/Logger';

// Get database functions
const database = container.resolve(DBConnection);
// Resolve middleware functions
const middleware = container.resolve(RequestHooks);

// create express application
const app: express.Application = express();

// let express support JSON bodies
app.use(bodyParser.json());

// Setup cross-origin-requests
app.use(cors());

// Handle pre request operations
app.use(middleware.handleRequest);

// Create database connection
app.use(database.connect);

// Collect the Routes from container and register endpoints
const routes: IRoutes[] = container.getAll<IRoutes>(TYPES.Route);
routes.forEach((route) => route.register(app));

// Handle api error response
app.use(middleware.handleErrorResponse);

// Handle success response
app.use(middleware.handleResponse);

// Handle invalid route error
app.use(middleware.handle404ErrorResponse);

// Start express server
app.listen(APP.PORT, () => {
    logger.info('App listening on port ' + APP.PORT + '!');
});

process.on('uncaughtException', (err) => {
    logger.error('uncaughtException', err);
    process.exit(0);
});
