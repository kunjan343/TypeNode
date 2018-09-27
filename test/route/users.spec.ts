import { expect, should } from 'chai';
import * as request from 'supertest';
import { app } from '../../src/index';
import 'mocha';
import 'reflect-metadata';
import { UserRoute } from '../../src/routes/UserRoute';
import { APP, ROUTES } from '../../src/constants/server';
import { USER_MESSAGE } from '../../src/constants/message/user.message';

should();

const userPrefix: string = APP.ROUTE_PREFIX + ROUTES.USER;

describe('userRoute', () => {
    it('should create instance of class', () => {
        const userRoute = new UserRoute();
        expect(userRoute).to.not.equal(null);
    });

    it('it should not register without username', (done) => {
        request(app)
          .post(userPrefix + '/register')
          .send({})
          .end((err: any, res: any) => {
              expect(res.statusCode).to.be.equal(400);
              expect(res.body.error).to.be.equal(USER_MESSAGE.ERROR.EMPTY.USERNAME);
              done();
          });
    });

    it('it should not register without password', (done) => {
        request(app)
          .post(userPrefix + '/register')
          .send({username: 'test@test.com'})
          .end((err: any, res: any) => {
              expect(res.statusCode).to.be.equal(400);
              expect(res.body.error).to.be.equal(USER_MESSAGE.ERROR.EMPTY.PASSWORD);
              done();
          });
    });

    it('it should register successfully', (done) => {
        request(app)
          .post(userPrefix + '/register')
          .send({username: 'test@test.com', password: '1234'})
          .end((err: any, res: any) => {
              expect(res.statusCode).to.be.equal(200);
              expect(res.body.message).to.be.equal(USER_MESSAGE.SUCCESS.CREATE);
              done();
          });
    });
});
