import 'mocha';
import 'reflect-metadata';
import { expect, should } from 'chai';
import * as request from 'supertest';
import { app } from '../../src/index';
import { IUtils, Utils } from '../../src/lib/utils';
import { UserRoute } from '../../src/routes/UserRoute';
import { APP, ROUTES } from '../../src/constants/server';
import { USER_MESSAGE } from '../../src/constants/message/user.message';

should();

const utils: IUtils = new Utils();
// Global variables
const userPrefix: string = APP.ROUTE_PREFIX + ROUTES.USER;
let username: string;
let userId: string;

describe('userRoute', () => {
    it('should create instance of class', () => {
        const userRoute = new UserRoute();
        expect(userRoute).to.not.equal(null);
    });

    it('should not register without username', (done) => {
        request(app)
          .post(userPrefix + '/register')
          .end((err: any, res: any) => {
              expect(res.statusCode).to.be.equal(400);
              expect(res.body.error).to.be.equal(USER_MESSAGE.ERROR.EMPTY.USERNAME);
              done();
          });
    });

    it('should not register without password', (done) => {
        request(app)
          .post(userPrefix + '/register')
          .send({username: utils.randomString(10)})
          .end((err: any, res: any) => {
              expect(res.statusCode).to.be.equal(400);
              expect(res.body.error).to.be.equal(USER_MESSAGE.ERROR.EMPTY.PASSWORD);
              done();
          });
    });

    it('should register successfully', (done) => {
        username = utils.randomString(10);
        const user = {
            username,
            password: utils.randomString(6)
        };
        request(app)
          .post(userPrefix + '/register')
          .send(user)
          .end((err: any, res: any) => {
              expect(res.statusCode).to.be.equal(200);
              expect(res.body.message).to.be.equal(USER_MESSAGE.SUCCESS.CREATE);
              done();
          });
    });

    it('should not register for duplicate username', (done) => {
        const user = {
            username,
            password: utils.randomString(6)
        };
        request(app)
          .post(userPrefix + '/register')
          .send(user)
          .end((err: any, res: any) => {
              expect(res.statusCode).to.be.equal(409);
              expect(res.body.error).to.be.equal(USER_MESSAGE.ERROR.CONFLICT.USERNAME);
              done();
          });
    });

    it('should search user by username', (done) => {
        request(app)
          .get(userPrefix + '/search/' + username)
          .end((err: any, res: any) => {
              expect(res.statusCode).to.be.equal(200);
              expect(res.body.username).to.be.equal(username);
              done();
          });
    });

    it('should return empty data if username is invalid', (done) => {
        request(app)
          .get(userPrefix + '/search/' + utils.randomString(12))
          .end((err: any, res: any) => {
              expect(res.statusCode).to.be.equal(200);
              expect(res.body).to.be.empty;
              done();
          });
    });

    it('should return list of all users', (done) => {
        request(app)
          .get(userPrefix + '/all')
          .end((err: any, res: any) => {
              expect(res.statusCode).to.be.equal(200);
              expect(res.body).to.be.not.empty;
              userId = res.body[0]._id;
              done();
          });
    });

    it('should not update user with wrong userId', (done) => {
        request(app)
          .put(userPrefix + '/update/123456')
          .end((err: any, res: any) => {
              expect(res.statusCode).to.be.equal(400);
              done();
          });
    });

    it('should not update empty user detail', (done) => {
        request(app)
          .put(userPrefix + '/update/' + userId)
          .end((err: any, res: any) => {
              expect(res.statusCode).to.be.equal(400);
              expect(res.body.error).to.be.equal(USER_MESSAGE.ERROR.EMPTY.DATA);
              done();
          });
    });

    it('should update user detail successfully', (done) => {
        const userDetail = {
            username: 'abc123'
        };
        request(app)
          .put(userPrefix + '/update/' + userId)
          .send(userDetail)
          .end((err: any, res: any) => {
              expect(res.statusCode).to.be.equal(200);
              expect(res.body.message).to.be.equal(true);
              done();
          });
    });

    it('should not remove user for wrong userId', (done) => {
        request(app)
          .delete(userPrefix + '/remove/aaaaaaaaaaaaaaaaaaaaaaaa')
          .end((err: any, res: any) => {
              expect(res.statusCode).to.be.equal(400);
              expect(res.body.error).to.be.equal(USER_MESSAGE.ERROR.EMPTY.USERDATA);
              done();
          });
    });

    it('should remove user data successfully', (done) => {
        request(app)
          .delete(userPrefix + '/remove/' + userId)
          .end((err: any, res: any) => {
              expect(res.statusCode).to.be.equal(200);
              expect(res.body.message).to.be.equal(true);
              done();
          });
    });
});
