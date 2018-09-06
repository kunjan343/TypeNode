import * as express from 'express';

export interface IRegistrableRoutes {
    register(app: express.Application): void;
}
