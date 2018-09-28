import { injectable } from 'inversify';
import * as _ from 'lodash';
import { FIELDS } from '../constants/model';
import { logger } from './logger';

/**
 * Object handler class interface
 */
export interface IObjectHandler {
    filterObject(data: any, fields: string[]): object;
}

/**
 * Implements common object manipulation methods
 */
@injectable()
export class ObjectHandler implements IObjectHandler {

    /**
     * Filter specified fields from object.
     * Useful for creating database object.
     * @param data      object data
     * @param fields    list of object fields
     * @returns         generated object data
     */
    public filterObject = (data: object, fields: string[]): any => {
        try {
            fields = FIELDS.DEFAULT.concat(fields);
            const objectData: any = {};
            fields.forEach((field: string) => {
                if (data[field] !== undefined && data[field] !== null && !_.isEmpty(data[field])) {
                    objectData[field] = data[field];
                }
            });
            objectData.createdAt = objectData._id ? objectData.createdAt : new Date();
            objectData.updatedAt = new Date();
            return objectData;
        } catch (error) {
            logger.error('filterObject error', error);
            return error;
        }
    }
}
