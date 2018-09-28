import * as fs from 'fs-extra';
import * as _ from 'lodash';
import { TYPES_FILE } from '../../constants/generator';
import { logger } from '../logger';
import { IFileObject } from './read-files.generate';

/**
 * Class having methods to create types file
 */
export class TypesGenerator {

    /**
     * Create types file content and write it in project root directory
     * @param fileList  list of project files
     * @param filePath  path of project root directory
     * @returns boolean list of project files having class
     */
    public generateTypes = async (fileList: IFileObject[], filePath: string) => {
        try {
            try {
                // Remove if file is exist
                fs.unlinkSync(filePath + '/types.ts');
            } catch (error) {
                // logger.info('file not found');
            }
            let fileText = TYPES_FILE.PREFIX;
            // Create type link for each file
            fileList.forEach((file: IFileObject) => {
                if (_.isEmpty(file.className.match(/Route/g))) {
                    fileText = fileText + `${file.className}: Symbol('${file.className}'),\n`;
                }
            });
            // Append default export to file
            fileText = fileText + TYPES_FILE.POSTFIX;
            // Write file in root directory of project
            fs.writeFileSync(filePath + '/types.ts', fileText);
            return true;
        } catch (error) {
            logger.error('Generate file list error:', error);
            throw error;
        }
    }
}
