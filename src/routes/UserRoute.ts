import * as express from 'express';
import { inject, injectable } from 'inversify';
import { IRoutes } from '../interfaces/route/IRoutes';
import { UserService } from '../service/UserService';
import TYPES from '../types';

@injectable()
export class UserRoute implements IRoutes {
    private userService: UserService;

    constructor(@inject(TYPES.UserService) userService: UserService) {
        this.userService = userService;
    }

    public register(app: express.Application): void {
        /*app.route('/')
          .get(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
              const addresses = await this.addressService.getUseres().catch((err) => next(err));
              res.json(addresses);
          })
          .post(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
              const address = new User(
                req.body.address1,
                req.body.address2,
                req.body.city,
                req.body.state,
                req.body.zip,
                req.body.country
              );
              const createdUser = await this.addressService.createUser(address).catch((err) => next(err));
              res.json(createdUser);
          });

        app.route('/:id')
          .get(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
              const addresses = await this.addressService.getUser(req.params.id).catch((err) => next(err));
              res.json(addresses);
          })
          .put(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
              const address = new User(
                req.body.address1,
                req.body.address2,
                req.body.city,
                req.body.state,
                req.body.zip,
                req.body.country,
                req.body.id
              );

              const updatedUser = await this.addressService.updateUser(address).catch((err) => next(err));
              res.json(updatedUser);
          });*/
    }
}
