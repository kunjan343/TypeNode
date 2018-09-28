import { logger } from '../logger';
import { IFileObject } from './read-files.generate';
import * as fs from 'fs-extra';
import * as _ from 'lodash';
import { CONTAINER_FILE } from '../../constants/generator';

/**
 * Class contain methods to generate container file
 */
export class ContainerGenerator {

    /**
     * Main function to create generator file
     * @param fileList  list of project files contain class detail
     * @param filePath  path of root directory
     * @returns boolean successfully exit on file generation
     */
    public generateInjects = async (fileList: IFileObject[], filePath: string) => {
        try {
            try {
                fs.unlinkSync(filePath + '/inversify.config.ts');
            } catch (error) {
                // logger.info('file not found');
            }
            let fileText = await this.generateImports(fileList);
            fileText = fileText + await this.generateBinds(fileList);
            fileText = fileText + CONTAINER_FILE.POSTFIX;
            fs.writeFileSync(filePath + '/inversify.config.ts', fileText);
            return true;
        } catch (error) {
            logger.error('Generate file list error:', error);
            throw error;
        }
    }

    /**
     * Create string line for import statements
     * @param fileList  list of project files contain class detail
     * @returns importText return string of imports
     */
    private generateImports = async (fileList: IFileObject[]) => {
        try {
            let importText = CONTAINER_FILE.IMPORTS_PREFIX;
            fileList.forEach((file: IFileObject) => {
                if (!_.isEmpty(file.className.match(/[rR]oute/g))) {
                    importText = importText + `import { ${file.className} } from '${file.path}/${file.name}';\n`;
                } else {
                    importText = importText + `import { ${file.className}, ${file.interfaceName} } from '${file.path}/${file.name}';\n`;
                }
            });
            return importText;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Create class binding string for container
     * @param fileList  list of project files contain class detail
     * @returns bindText return string of bindings
     */
    private generateBinds = async (fileList: IFileObject[]) => {
        try {
            let bindText = CONTAINER_FILE.BINDS_PREFIX;
            fileList.forEach((file: IFileObject) => {
                if (!_.isEmpty(file.className.match(/[rR]oute/g))) {
                    bindText = bindText + `container.bind<IRoutes>(TYPES.Route).to(${file.className});\n`;
                } else {
                    bindText = bindText + `container.bind<${file.interfaceName}>(TYPES.${file.className}).to(${file.className});\n`;
                }
            });
            return bindText;
        } catch (error) {
            throw error;
        }
    }
}
