import { expect, should } from 'chai';
import 'mocha';
import 'reflect-metadata';
import { logger } from '../../src/lib/logger';
import { DefaultRoute } from '../../src/routes/defaultRoute';

should();

describe('defaultRoute', () => {
    before(() => {
        logger.info('defaultRoute: before test executed');
    });

    after(() => {
        logger.info('defaultRoute: after test executed');
    });

    it('should create instance of class', () => {
        const userRoute = new DefaultRoute();
        expect(userRoute).to.not.equal(null);
    });
});
