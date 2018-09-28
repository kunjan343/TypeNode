import 'reflect-metadata';
import { FileStructure, IFileObject } from './lib/generator/read-files.generate';
import { TypesGenerator } from './lib/generator/types.generate';
import { logger } from './lib/logger';
import { ContainerGenerator } from './lib/generator/container.generate';

declare const process;

export class FileGenerator {

    public generate = async () => {
        try {
            logger.info('1) Generating file list...');
            const fileStructure = new FileStructure();
            const fileList: IFileObject[] = await fileStructure.readFiles(__dirname);
            logger.info('   complete');
            logger.info('2) Generating types...');
            const typesGenerator = new TypesGenerator();
            await typesGenerator.generateTypes(fileList, __dirname);
            logger.info('   complete');
            logger.info('3) Generating container file...');
            const containerGenerator = new ContainerGenerator();
            await containerGenerator.generateInjects(fileList, __dirname);
            logger.info('   complete');
            return __dirname;
        } catch (error) {
            logger.error('File Generation Error:', error);
            process.exit(1);
        }
    }
}

const generator = new FileGenerator();
generator.generate();
