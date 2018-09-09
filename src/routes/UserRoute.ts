import * as express from 'express';
import { inject, injectable } from 'inversify';
import { APP, ROUTES } from '../constants/index';
import { UserController } from '../controller/UserController';
import { IRoutes } from '../interfaces/IRoutes';
import { UserOpsService } from '../services/operations/UserOpsService';
import { UserValidationService } from '../services/validations/UserValidationService';
import TYPES from '../types';

@injectable()
export class UserRoute implements IRoutes {
    // Injectable
    @inject(TYPES.UserOpsService) private userOpsService: UserOpsService;
    @inject(TYPES.UserValidationService) private userValidationService: UserValidationService;
    @inject(TYPES.UserController) private userController: UserController;
    // Variables
    private userPrefix: string = APP.ROUTE_PREFIX + ROUTES.USER;

    public register(app: express.Application): void {
        app.route(this.userPrefix + '/register')
          .post([
              this.userValidationService.validateRegisterUser,
              this.userOpsService.createUser,
              this.userController.userData
          ]);
    }
}
