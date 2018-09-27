import * as express from 'express';
import { injectable } from 'inversify';
import { IRoutes } from '../interfaces/IRoutes';
import { MESSAGE } from '../constants/server';

@injectable()
export class DefaultRoute implements IRoutes {

    public register(app: express.Application): void {
        app.route('/')
          .get(async (req: express.Request, res: express.Response) => {
              res.json({message: MESSAGE.SERVER_LISTENING});
          });

        app.route('/favicon.ico')
          .get(async (req: express.Request, res: express.Response) => {
              res.json({message: MESSAGE.SERVER_LISTENING});
          });
    }
}
