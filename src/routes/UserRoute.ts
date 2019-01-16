import * as express from 'express';
import { inject, injectable } from 'inversify';
import { APP, ROUTES } from '../constants/server';
import { UserController } from '../controller/UserController';
import { IRoutes } from '../interfaces/IRoutes';
import { UserOpsService } from '../services/operations/UserOpsService';
import { UserValidationService } from '../services/validations/UserValidationService';
import TYPES from '../types';

/**
 * Define user routes
 */
@injectable()
export class UserRoute implements IRoutes {
    // Injectable
    @inject(TYPES.UserOpsService) private userOpsService: UserOpsService;
    @inject(TYPES.UserValidationService) private userValidationService: UserValidationService;
    @inject(TYPES.UserController) private userController: UserController;
    // Variables
    private userPrefix: string = APP.ROUTE_PREFIX + ROUTES.USER;

    public register(app: express.Application): void {
        // Create user request
        app.route(this.userPrefix + '/register')
          .post([
              this.userValidationService.validateRegisterUser,
              this.userOpsService.searchUserByUsername,
              this.userOpsService.createUser,
              this.userController.userList
          ]);

        // Search user by username
        app.route(this.userPrefix + '/search/:username')
          .get([
              this.userValidationService.validateSearchUser,
              this.userOpsService.searchUserByUsername,
              this.userController.userData
          ]);

        // Get all users list
        app.route(this.userPrefix + '/all')
          .get([
              this.userOpsService.searchUsers,
              this.userController.userList
          ]);

        // Update user by id reference
        app.route(this.userPrefix + '/update/:id')
          .put([
              this.userValidationService.validateUpdateUser,
              this.userOpsService.searchUser,
              this.userOpsService.update,
              this.userController.userData
          ]);
    }
}
