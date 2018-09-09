import { Container } from 'inversify';
import { IUserController, UserController } from './controller/UserController';
import { IRoutes } from './interfaces/IRoutes';
import { DBConnection, IDBConnection } from './lib/dbConnection';
import { IRequestHooks, RequestHooks } from './lib/requestHooks';
import { IUserModel, UserModel } from './models/UserModel';
import { DefaultRoute } from './routes/defaultRoute';
import { UserRoute } from './routes/UserRoute';
import { IUserOpsService, UserOpsService } from './services/operations/UserOpsService';
import { IUserValidationService, UserValidationService } from './services/validations/UserValidationService';
import TYPES from './types';

const container = new Container();
container.bind<IRoutes>(TYPES.Route).to(DefaultRoute);
container.bind<IRoutes>(TYPES.Route).to(UserRoute);
container.bind<IUserOpsService>(TYPES.UserOpsService).to(UserOpsService);
container.bind<IUserValidationService>(TYPES.UserValidationService).to(UserValidationService);
container.bind<IRequestHooks>(TYPES.RequestHooks).to(RequestHooks);
container.bind<IDBConnection>(TYPES.DBConnection).to(DBConnection);
container.bind<IUserController>(TYPES.UserController).to(UserController);
container.bind<IUserModel>(TYPES.UserModel).to(UserModel);

export default container;
