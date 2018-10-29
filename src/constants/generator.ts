/**
 * List default excluded file/folder list for generating file list
 */
export const EXCLUDE_FILES = [
    'index.ts',
    'inversify.config.ts',
    'types.ts',
    'generate.ts',
    'generator',
    'logger.ts',
    'interfaces',
    'database',
    'constants',
    'public'
];

/**
 * Default file content for types file
 */
export const TYPES_FILE = {
    PREFIX: 'const TYPES = {\n',
    POSTFIX: 'Route: Symbol(\'Route\')\n};\nexport default TYPES;\n'
};

/**
 * Default file content for container file
 */
export const CONTAINER_FILE = {
    IMPORTS_PREFIX: 'import { Container } from \'inversify\';\nimport TYPES from \'./types\';\nimport { IRoutes } from \'./interfaces/IRoutes\';\n',
    BINDS_PREFIX: 'const container = new Container();\n',
    POSTFIX: 'export default container;\n'
};
