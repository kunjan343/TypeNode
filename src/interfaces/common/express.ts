import { NextFunction, Request, RequestHandler, Response } from 'express';

export interface IReq extends Request {
    data: object | object[] | null;
}

export interface IRes extends Response {
}

export interface INext extends NextFunction {
}

export interface IReqFunc extends RequestHandler {
}
