import { injectable } from 'inversify';
import * as _ from 'lodash';
import { INext, IReq, IReqFunc, IRes } from '../interfaces/express';

/**
 * Defined interface for user controller
 */
export interface IUserController {
    userList(req: IReq, res: IRes, next: INext): IReqFunc;

    userData(req: IReq, res: IRes, next: INext): IReqFunc;
}

/**
 * User controller to create response object from data
 */
@injectable()
export class UserController implements IUserController {

    /**
     * Collect user data and store in response object
     * @param req     api request object
     * @param res     api response object
     * @param next    next callback
     * @returns       call next function
     */
    public userList: IReqFunc = (req: IReq, res: IRes, next: INext) => {
        req.data = _.isEmpty(req.userStore) ? [] : req.userStore;
        return next();
    }

    /**
     * Collect user data and store in response object
     * @param req     api request object
     * @param res     api response object
     * @param next    next callback
     * @returns       call next function
     */
    public userData: IReqFunc = (req: IReq, res: IRes, next: INext) => {
        req.data = _.isEmpty(req.userStore) ? {} : req.userStore;
        return next();
    }
}
