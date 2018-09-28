import * as express from 'express';

/**
 * Modify default express request interface
 */
export interface IReq extends express.Request {
    data: any;
    userStore: any;
}

/**
 * Modify default express response interface
 */
export interface IRes extends express.Response {
}

/**
 * Modify default express next function call interface
 */
export interface INext extends express.NextFunction {
}

/**
 * Modify default express request handler function interface
 */
export interface IReqFunc extends express.RequestHandler {
}
