import { Container } from 'inversify';
import { IRoutes } from './interfaces/route/IRoutes';
import { DBConnection, IDBConnection } from './lib/db/dbConnection';
import { IRequestHooks, RequestHooks } from './lib/middleware/requestHooks';
import { IUserModel, UserModel } from './models/UserModel';
import { DefaultRoute } from './routes/defaultRoute';
import { UserRoute } from './routes/UserRoute';
import { IUserService, UserService } from './service/UserService';
import TYPES from './types';

const container = new Container();
container.bind<IRoutes>(TYPES.Route).to(DefaultRoute);
container.bind<IRoutes>(TYPES.Route).to(UserRoute);
container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind<IRequestHooks>(TYPES.RequestHooks).to(RequestHooks);
container.bind<IDBConnection>(TYPES.DBConnection).to(DBConnection);
container.bind<IUserModel>(TYPES.UserModel).to(UserModel);

export default container;
