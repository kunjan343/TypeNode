import { Container } from 'inversify';
import { AddressController } from './controller/AddressController';
import { RegistrableController } from './controller/RegisterableController';
import { AddressRepository, AddressRepositoryImplDb } from './repository/AddressRepository';
import { AddressService, AddressServiceImpl } from './service/AddressService';
import TYPES from './types';

const container = new Container();
container.bind<RegistrableController>(TYPES.Controller).to(AddressController);
container.bind<AddressService>(TYPES.AddressService).to(AddressServiceImpl);
container.bind<AddressRepository>(TYPES.AddressRepository2).to(AddressRepositoryImplDb);

export default container;
