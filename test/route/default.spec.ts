import 'mocha';
import 'reflect-metadata';
import { expect, should } from 'chai';
import * as request from 'supertest';
import { app } from '../../src/index';
import { logger } from '../../src/lib/logger';
import { DefaultRoute } from '../../src/routes/defaultRoute';
import { MESSAGE } from '../../src/constants/server';

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

    it('it should successfully run server', (done) => {
        request(app)
          .get('/')
          .end((err: any, res: any) => {
              expect(res.statusCode).to.be.equal(200);
              expect(res.body.message).to.be.equal(MESSAGE.SERVER_LISTENING);
              done();
          });
    });

    it('it should successfully return favicon.ico', (done) => {
        request(app)
          .get('/favicon.ico')
          .end((err: any, res: any) => {
              expect(res.statusCode).to.be.equal(200);
              expect(res.body.message).to.be.equal(MESSAGE.SERVER_LISTENING);
              done();
          });
    });
});
