import * as bodyParser from 'body-parser';
import * as express from 'express';
import { RegistrableController } from './controller/RegisterableController';
import container from './inversify.config';
import TYPES from './types';
import { logger } from './util/Logger';

// create express application
const app: express.Application = express();
// let express support JSON bodies
app.use(bodyParser.json());

// grabs the Controller from IoC container and registers all the endpoints
const controllers: RegistrableController[] = container.getAll<RegistrableController>(TYPES.Controller);
controllers.forEach((controller) => controller.register(app));

// setup express middleware logging and error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error(err.stack);
    next(err);
});

app.use((err: Error, req: express.Request, res: express.Response) => {
    res.status(500).send('Internal Server Error');
});

app.listen(3000, () => {
    logger.info('Example app listening on port 3000!');
});
