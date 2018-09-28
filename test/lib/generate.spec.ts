import 'mocha';
import 'reflect-metadata';
import { expect, should } from 'chai';
import { FileGenerator } from '../../src/generate';
import * as fs from 'fs-extra';

should();

let srcPath = '';

describe('fileGenerator', () => {
    it('should generate files', async () => {
        const fileGenerator = new FileGenerator();
        try {
            srcPath = await fileGenerator.generate();
        } catch (error) {
            throw error;
        }
    });

    it('should not empty: types.ts', () => {
        const fileData = fs.readFileSync(srcPath + '/types.ts', 'utf8');
        expect(fileData).to.not.equal(null);
    });

    it('should not empty: inversify.config.ts', () => {
        const fileData = fs.readFileSync(srcPath + '/inversify.config.ts', 'utf8');
        expect(fileData).to.not.equal(null);
    });
});
