import * as express from 'express';
import { injectable } from 'inversify';
import { IRoutes } from '../interfaces/IRoutes';
import { MESSAGE } from '../constants/server';

/**
 * Define default application routes
 */
@injectable()
export class DefaultRoute implements IRoutes {

    /**
     * Implements register routes method
     */
    public register(app: express.Application): void {
        // Base http request
        app.route('/')
          .get(async (req: express.Request, res: express.Response) => {
              res.json({message: MESSAGE.SERVER_LISTENING});
          });

        // Base favicon request
        app.route('/favicon.ico')
          .get(async (req: express.Request, res: express.Response) => {
              res.json({message: MESSAGE.SERVER_LISTENING});
          });
    }
}
