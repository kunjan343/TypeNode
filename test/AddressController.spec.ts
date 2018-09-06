import 'reflect-metadata';
import * as test from 'tape';
import { AddressRoute } from '../src/routes/AddressRoute';

test('addressController', (t) => {
    t.plan(1);

    const route = new AddressRoute(null);

    t.assert(route !== null);
});
