import 'reflect-metadata';
import * as test from 'tape';
import { UserRoute } from '../src/routes/UserRoute';

test('userRoute', (t) => {
    t.plan(1);

    const route = new UserRoute(null);

    t.assert(route !== null);
});
