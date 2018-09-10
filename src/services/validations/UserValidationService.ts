import * as Boom from 'boom';
import { injectable } from 'inversify';
import * as _ from 'lodash';
import { INext, IReq, IReqFunc, IRes } from '../../interfaces/express';

export interface IUserValidationService {
    validateRegisterUser(req: IReq, res: IRes, next: INext): IReqFunc;
}

@injectable()
export class UserValidationService implements IUserValidationService {

    public validateRegisterUser: IReqFunc = (req: IReq, res: IRes, next: INext) => {
        const params = _.merge(req.body, req.params);
        req.params = params;
        if (_.isEmpty(params.username)) {
            return next(Boom.badRequest('Please enter username'));
        } else if (_.isEmpty(params.password)) {
            return next(Boom.badRequest('Please enter password'));
        }
        return next();
    }
}
