import * as express from 'express';

export interface IReq extends express.Request {
    data: any;
}

export interface IRes extends express.Response {
}

export interface INext extends express.NextFunction {
}

export interface IReqFunc extends express.RequestHandler {
}
