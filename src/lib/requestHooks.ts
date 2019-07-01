import * as Boom from 'boom';
import * as _ from 'lodash';
import { ErrorRequestHandler } from 'express';
import { injectable } from 'inversify';
import { INext, IReq, IReqFunc, IRes } from '../interfaces/express';
import { MESSAGE } from '../constants/server';

/**
 * Define methods for middleware handler functions
 */
export interface IRequestHooks {
    handleRequest(req: IReq, res: IRes, next: INext): IReqFunc;

    handleResponse(req: IReq, res: IRes, next: INext): IReqFunc;

    handleErrorResponse(error: any, req: IReq, res: IRes, next: INext): ErrorRequestHandler;

    handle500ErrorResponse(req: IReq, res: IRes, next: INext): IReqFunc;
}

/**
 * Implements middleware api request methods
 */
@injectable()
export class RequestHooks implements IRequestHooks {
    /**
     * Handle pre request api operations
     * @param req   api request object
     * @param res   api request object
     * @param next  next function call
     * @returns     request handler function
     */
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

        return next();
    }

    /**
     * Handle successful api response and send back to caller
     * @param req   api request object
     * @param res   api request object
     * @param next  next function call
     * @returns     request handler function
     */
    public handleResponse: IReqFunc = (req: IReq, res: IRes, next: INext) => {
        if (req.data === undefined) {
            return next();
        }

        const resObject = req.data || [];
        return res.json(resObject);
    }

    /**
     * Handle error response from api and send back to caller
     * @param error error response from api operation
     * @param req   api request object
     * @param res   api request object
     * @param next  next function call
     * @returns     request handler function
     */
    public handleErrorResponse: ErrorRequestHandler = (error: any, req: IReq, res: IRes, next: INext) => {
        console.log("error",error);
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
        res.end(JSON.stringify(errorResponse));
    }

    /**
     * Handle invalid route request and send back as an error
     * @param req   api request object
     * @param res   api request object
     * @param next  next function call
     * @returns     request handler function
     */
    public handle500ErrorResponse: IReqFunc = (req: IReq, res: IRes, next: INext) => {
        const error: any = Boom.badRequest(MESSAGE.INVALID_ROUTE);
        return next(error);
    }
}
