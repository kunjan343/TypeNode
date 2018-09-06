import { Container } from 'inversify';
import { IRoutes } from './interfaces/route/IRoutes';
import { DBConnection, IDBConnection } from './lib/db/dbConnection';
import { AddressModel, IAddressModel } from './models/AddressModel';
import { AddressRoute } from './routes/AddressRoute';
import { DefaultRoute } from './routes/defaultRoute';
import { AddressService, IAddressService } from './service/AddressService';
import TYPES from './types';

const container = new Container();
container.bind<IRoutes>(TYPES.Route).to(DefaultRoute);
container.bind<IRoutes>(TYPES.Route).to(AddressRoute);
container.bind<IAddressService>(TYPES.AddressService).to(AddressService);
container.bind<IDBConnection>(TYPES.DBConnection).to(DBConnection);
container.bind<IAddressModel>(TYPES.AddressModel).to(AddressModel);

export default container;
