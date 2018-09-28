import * as fs from 'fs-extra';
import * as _ from 'lodash';
import * as path from 'path';
import { EXCLUDE_FILES } from '../../constants/generator';
import { logger } from '../logger';

/**
 * File object structure interface
 */
export interface IFileObject {
    name: string;
    path: string;
    extension?: string;
    className?: string;
    interfaceName?: string;
}

/**
 * Class having methods to create project files list
 */
export class FileStructure {

    /**
     * Get list of all project files and create list
     * @param dir       path of project root directory
     * @returns results list of project files having class
     */
    public readFiles = async (dir) => {
        try {
            const results: IFileObject[] = [];
            const coreFiles: IFileObject[] = [];
            const baseFiles = fs.readdirSync(dir);

            baseFiles.forEach((file) => {
                coreFiles.push({
                    name: file,
                    path: this.getNormalizePath(dir)
                });
            });

            while (coreFiles.length > 0) {
                const currentFile: IFileObject = coreFiles.splice(0, 1)[0];
                const excludedFile = EXCLUDE_FILES.find((file) => {
                    return file === currentFile.name;
                });
                if (!_.isEmpty(excludedFile)) {
                    continue;
                }
                const parentPath = this.getNormalizePath(currentFile.path + '/' + currentFile.name);
                const fileStat = fs.statSync(parentPath);
                if (fileStat.isDirectory()) {
                    const dirFiles = fs.readdirSync(parentPath);
                    dirFiles.forEach((file) => {
                        coreFiles.push({
                            name: file,
                            path: parentPath
                        });
                    });
                    continue;
                }
                const fileExt = path.extname(parentPath);
                const fileContent = fs.readFileSync(parentPath, 'utf8');
                const fileClass = fileContent.match(/export class [a-zA-Z]*/g)[0].split(' ').pop();
                let fileInterface = '';
                try {
                    fileInterface = fileContent.match(/export interface [a-zA-Z]*/g)[0].split(' ').pop();
                } catch (error) {
                    // logger.info('no interface, may be route file: currentFile.name');
                }

                results.push({
                    name: currentFile.name.replace(fileExt, ''),
                    extension: fileExt,
                    path: currentFile.path.replace(this.getNormalizePath(dir), '.'),
                    className: fileClass,
                    interfaceName: fileInterface
                });
            }
            return results;
        } catch (error) {
            logger.error('Generate file list error:', error);
            throw error;
        }
    }

    /**
     * Normalize file path
     * Function use specifically for simplify path on windows system
     * @param filePath  full system path of file
     * @returns string  normalized path name
     */
    private getNormalizePath = (filePath: string) => {
        return path.normalize(filePath).replace(/\\/g, '/');
    }
}
