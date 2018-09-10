import { injectable } from 'inversify';
import * as _ from 'lodash';
import { FIELDS } from '../constants/model';
import { logger } from './logger';

export interface IObjectHandler {
    filterObject(data: any, fields: string[]): object;
}

@injectable()
export class ObjectHandler implements IObjectHandler {

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
