import { injectable } from 'inversify';
import * as _ from 'lodash';
import { INext, IReq, IReqFunc, IRes } from '../../interfaces/common/express';

export interface IRequestHooks {
    handleRequest(req: IReq, res: IRes, next: INext): IReqFunc;
}

@injectable()
export class RequestHooks implements IRequestHooks {
    public handleRequest: IReqFunc = (req: IReq, res: IRes, next: INext) => {
        if (req.method === 'OPTIONS') {
            req.data = {message: true};
        }
        // Trim query and post parameters
        _.each(req.body, (value, key) => {
            if ((_.isString(value) && !_.isEmpty(value))) {
                req.body[key] = value.trim();
            }
        });

        _.each(req.query, (value, key) => {
            if ((_.isString(value) && !_.isEmpty(value))) {
                req.query[key] = value.trim();
            }
        });

        // utils.setBaseUrl(req);
        return next();
    }
}
