import { ErrorRequestHandler } from 'express';
import { injectable } from 'inversify';
import * as _ from 'lodash';
import { INext, IReq, IReqFunc, IRes } from '../interfaces/express';

export interface IRequestHooks {
    handleRequest(req: IReq, res: IRes, next: INext): IReqFunc;

    handleResponse(req: IReq, res: IRes, next: INext): IReqFunc;

    handleErrorResponse(error: any, req: IReq, res: IRes, next: INext): ErrorRequestHandler;

    handle404ErrorResponse(req: IReq, res: IRes, next: INext): IReqFunc;
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

    public handleResponse: IReqFunc = (req: IReq, res: IRes, next: INext) => {
        if (req.data === undefined) {
            return next();
        }

        const resObject = req.data || [];
        return res.json(resObject);
    }

    public handleErrorResponse: ErrorRequestHandler = (error: any, req: IReq, res: IRes, next: INext) => {
        if (!error) {
            return next();
        }
        let errorResponse: any = {};
        if (error.output && error.output.payload) {
            errorResponse = {
                stack: error.stack,
                error: error.output.payload.message,
                message: error.output.payload.error,
                statusCode: error.output.payload.statusCode || 404
            };
        } else {
            errorResponse = {
                stack: error.stack,
                error: error.error || error.type || error.message,
                message: error.message,
                statusCode: error.statusCode || 404
            };
        }

        res.status(errorResponse.statusCode ? errorResponse.statusCode : 404).json(errorResponse);
        res.end();
    }

    public handle404ErrorResponse: IReqFunc = (req: IReq, res: IRes, next: INext) => {
        return next(new Error('Invalid request'));
    }
}
