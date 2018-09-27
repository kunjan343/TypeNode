import * as Boom from 'boom';
import { injectable } from 'inversify';
import * as _ from 'lodash';
import { INext, IReq, IReqFunc, IRes } from '../../interfaces/express';
import { USER_MESSAGE } from '../../constants/message/user.message';

export interface IUserValidationService {
    validateRegisterUser(req: IReq, res: IRes, next: INext): IReqFunc;
}

@injectable()
export class UserValidationService implements IUserValidationService {

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
}
