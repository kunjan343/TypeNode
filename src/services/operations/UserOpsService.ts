import * as Boom from 'boom';
import * as _ from 'lodash';
import { inject, injectable } from 'inversify';
import { FIELDS } from '../../constants/model';
import { IUser } from '../../database/UserSchema';
import { INext, IReq, IReqFunc, IRes } from '../../interfaces/express';
import { logger } from '../../lib/logger';
import { ObjectHandler } from '../../lib/objectHandler';
import { UserModel } from '../../models/UserModel';
import TYPES from '../../types';
import { USER_MESSAGE } from '../../constants/message/user.message';
import { ObjectID } from 'typeorm';

/**
 * Define methods for user operation functions
 */
export interface IUserOpsService {
    createUser(req: IReq, res: IRes, next: INext): IReqFunc;

    searchUserByUsername(req: IReq, res: IRes, next: INext): IReqFunc;

    searchUsers(req: IReq, res: IRes, next: INext): IReqFunc;

    searchUser(req: IReq, res: IRes, next: INext): IReqFunc;

    update(req: IReq, res: IRes, next: INext): IReqFunc;
}

/**
 * User service to handle api operation based function
 */
@injectable()
export class UserOpsService implements IUserOpsService {
    // Injectable
    @inject(TYPES.UserModel) private userModel: UserModel;
    @inject(TYPES.ObjectHandler) private objectHandler: ObjectHandler;

    /**
     * Call and create new user into database
     * @param req   api request object
     * @param res   api request object
     * @param next  next function call
     * @returns     request handler function
     */
    public createUser: IReqFunc = async (req: IReq, res: IRes, next: INext) => {
        try {
            if (!_.isEmpty(req.userStore)) {
                return next(Boom.conflict(USER_MESSAGE.ERROR.CONFLICT.USERNAME));
            }
            const user: IUser = this.objectHandler.filterObject(req.params, FIELDS.USER);
            await this.userModel.create(user);
            req.userStore = {message: USER_MESSAGE.SUCCESS.CREATE};
            return next();
        } catch (error) {
            logger.error('createUser', error);
            return next(error);
        }
    }

    /**
     * Search user by username from database
     * @param req   api request object
     * @param res   api request object
     * @param next  next function call
     * @returns     request handler function
     */
    public searchUserByUsername: IReqFunc = async (req: IReq, res: IRes, next: INext) => {
        try {
            const username: string = req.params.username;
            req.userStore = await this.userModel.searchByUsername(username);
            return next();
        } catch (error) {
            logger.error('createUser', error);
            return next(error);
        }
    }

    /**
     * Get all users from database
     * @param req   api request object
     * @param res   api request object
     * @param next  next function call
     * @returns     request handler function
     */
    public searchUsers: IReqFunc = async (req: IReq, res: IRes, next: INext) => {
        try {
            req.userStore = await this.userModel.searchAll();
            return next();
        } catch (error) {
            logger.error('createUser', error);
            return next(error);
        }
    }

    /**
     * Search user detail by id
     * @param req     api request object
     * @param res     api response object
     * @param next    next callback
     * @returns       request handler function
     */
    public searchUser: IReqFunc = async (req: IReq, res: IRes, next: INext) => {
        try {
            const id: ObjectID = req.params.id;
            req.userStore = await this.userModel.search(id);
            return next();
        } catch (error) {
            logger.error('createUser', error);
            return next(error);
        }
    }

    /**
     * Update user detail
     * @param req     api request object
     * @param res     api response object
     * @param next    next callback
     * @returns       request handler function
     */
    public update: IReqFunc = async (req: IReq, res: IRes, next: INext) => {
        try {
            const data = _.merge(req.params, req.body);
            if (_.isEmpty(req.userStore)) {
                return next(Boom.badRequest(USER_MESSAGE.ERROR.EMPTY.USERDATA));
            }
            const id: ObjectID = req.userStore._id;
            await this.userModel.update(id, data);
            req.userStore = {message: true};
            return next();
        } catch (error) {
            logger.error('createUser', error);
            return next(error);
        }
    }
}
