import 'reflect-metadata';
import { FileStructure, IFileObject } from './lib/generator/read-files.generate';
import { TypesGenerator } from './lib/generator/types.generate';
import { logger } from './lib/logger';
import { ContainerGenerator } from './lib/generator/container.generate';

declare const process;

const DIR_PATH = __dirname + '/src';

/**
 * File generator creates two important files in project.
 */
export class FileGenerator {

    /**
     * Collects list of necessary files from project root.
     * Generate types file based on file list.
     * Generate container injection based on file list.
     * @returns Promise<string>   path of project root directory
     */
    public generate = async () => {
        try {
            logger.info('1) Generating file list...');
            const fileStructure = new FileStructure();
            const fileList: IFileObject[] = await fileStructure.readFiles(DIR_PATH);
            logger.info('   complete');
            logger.info('2) Generating types...');
            const typesGenerator = new TypesGenerator();
            await typesGenerator.generateTypes(fileList, DIR_PATH);
            logger.info('   complete');
            logger.info('3) Generating container file...');
            const containerGenerator = new ContainerGenerator();
            await containerGenerator.generateInjects(fileList, DIR_PATH);
            logger.info('   complete');
            return __dirname;
        } catch (error) {
            logger.error('File Generation Error:', error);
            process.exit(1);
        }
    }
}

/**
 * Create instance of class and call generate method
 */
const generator = new FileGenerator();
generator.generate();
