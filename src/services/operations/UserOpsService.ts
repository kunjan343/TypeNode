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

/**
 * Define methods for user operation functions
 */
export interface IUserOpsService {
    createUser(req: IReq, res: IRes, next: INext): IReqFunc;
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
            req.userStore = await this.userModel.search();
            return next();
        } catch (error) {
            logger.error('createUser', error);
            return next(error);
        }
    }
}
