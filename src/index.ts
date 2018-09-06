import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import 'reflect-metadata';
import { IRoutes } from './interfaces/route/IRoutes';
import container from './inversify.config';
import TYPES from './types';
import { logger } from './util/Logger';

// create express application
const app: express.Application = express();
// let express support JSON bodies
app.use(bodyParser.json());
app.use(cors());

// grabs the Controller from IoC container and registers all the endpoints
const routes: IRoutes[] = container.getAll<IRoutes>(TYPES.Route);
routes.forEach((controller) => controller.register(app));

app.listen(3000, () => {
    logger.info('Example app listening on port 3000!');
});
