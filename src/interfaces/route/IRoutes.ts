import * as express from 'express';

export interface IRoutes {
    register(app: express.Application): void;
}
