import * as express from 'express';

/**
 * Global route interface.
 * Implements base method register necessary in every route.
 */
export interface IRoutes {
    register(app: express.Application): void;
}
