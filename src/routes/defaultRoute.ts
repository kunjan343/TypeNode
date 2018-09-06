import * as express from 'express';
import { injectable } from 'inversify';
import { IRoutes } from '../interfaces/route/IRoutes';

@injectable()
export class DefaultRoute implements IRoutes {

    public register(app: express.Application): void {
        app.route('/')
          .get(async (req: express.Request, res: express.Response) => {
              res.json({message: 'Sample server is listening!'});
          });

        app.route('/favicon.ico')
          .get(async (req: express.Request, res: express.Response) => {
              res.json({message: 'Sample server is listening!'});
          });
    }
}
