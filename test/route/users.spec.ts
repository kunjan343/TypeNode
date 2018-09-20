import { expect, should } from 'chai';
import 'mocha';
import 'reflect-metadata';
import { UserRoute } from '../../src/routes/UserRoute';

should();

describe('userRoute', () => {
    it('should create instance of class', () => {
        const userRoute = new UserRoute();
        expect(userRoute).to.not.equal(null);
    });
});
