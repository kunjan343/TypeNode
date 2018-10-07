import * as Boom from 'boom';
import { injectable } from 'inversify';
import * as _ from 'lodash';
import { INext, IReq, IReqFunc, IRes } from '../../interfaces/express';
import { USER_MESSAGE } from '../../constants/message/user.message';

/**
 * Define methods for user validation functions
 */
export interface IUserValidationService {
    validateRegisterUser(req: IReq, res: IRes, next: INext): IReqFunc;
}

/**
 * User service to handle api object validations
 */
@injectable()
export class UserValidationService implements IUserValidationService {

    /**
     * Validate incoming create user request
     * @param req   api request object
     * @param res   api request object
     * @param next  next function call
     * @returns     request handler function
     */
    public validateRegisterUser: IReqFunc = (req: IReq, res: IRes, next: INext) => {
        const params = _.merge(req.body, req.params);
        req.params = params;
        if (_.isEmpty(params.username)) {
            return next(Boom.badRequest(USER_MESSAGE.ERROR.EMPTY.USERNAME));
        } else if (_.isEmpty(params.password)) {
            return next(Boom.badRequest(USER_MESSAGE.ERROR.EMPTY.PASSWORD));
        }
        return next();
    }

    /**
     * Validate search user request
     * @param req   api request object
     * @param res   api request object
     * @param next  next function call
     * @returns     request handler function
     */
    public validateSearchUser: IReqFunc = (req: IReq, res: IRes, next: INext) => {
        const params = _.merge(req.body, req.params);
        req.params = params;
        if (_.isEmpty(params.username)) {
            return next(Boom.badRequest(USER_MESSAGE.ERROR.EMPTY.USERNAME));
        }
        return next();
    }
}
