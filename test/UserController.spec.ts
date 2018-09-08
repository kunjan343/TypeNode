import 'reflect-metadata';
import * as test from 'tape';
import { UserRoute } from '../src/routes/UserRoute';

test('addressController', (t) => {
    t.plan(1);

    const route = new UserRoute(null);

    t.assert(route !== null);
});
