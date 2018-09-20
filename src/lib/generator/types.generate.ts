import * as fs from 'fs-extra';
import * as _ from 'lodash';
import { TYPES_FILE } from '../../constants/generator';
import { logger } from '../logger';
import { IFileObject } from './read-files.generate';

export class TypesGenerator {

    public generateTypes = async (fileList: IFileObject[], filePath: string) => {
        try {
            try {
                fs.unlinkSync(filePath + '/types.ts');
            } catch (error) {
                // logger.info('file not found');
            }
            let fileText = TYPES_FILE.PREFIX;
            fileList.forEach((file: IFileObject) => {
                if (_.isEmpty(file.className.match(/Route/g))) {
                    fileText = fileText + `${file.className}: Symbol('${file.className}'),\n`;
                }
            });
            fileText = fileText + TYPES_FILE.POSTFIX;
            fs.writeFileSync(filePath + '/types.ts', fileText);
            return true;
        } catch (error) {
            logger.error('Generate file list error:', error);
            throw error;
        }
    }
}
