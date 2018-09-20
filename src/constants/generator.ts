export const EXCLUDE_FILES = [
    'index.ts',
    'inversify.config.ts',
    'types.ts',
    'generate.ts',
    'generator',
    'logger.ts',
    'interfaces',
    'database',
    'constants'
];

export const TYPES_FILE = {
    PREFIX: 'const TYPES = {\n',
    POSTFIX: 'Route: Symbol(\'Route\')\n};\nexport default TYPES;\n'
};

export const CONTAINER_FILE = {
    IMPORTS_PREFIX: 'import { Container } from \'inversify\';\nimport TYPES from \'./types\';\nimport { IRoutes } from \'./interfaces/IRoutes\';\n',
    BINDS_PREFIX: 'const container = new Container();\n',
    POSTFIX: 'export default container;\n'
};
