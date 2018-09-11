# Node.js seed project for typescript starter server app


![Travis build](https://travis-ci.org/kunjan343/TypeNode.svg?branch=master)
[![dependencies Status](https://david-dm.org/kunjan343/TypeNode/status.svg)](https://david-dm.org/kunjan343/TypeNode)
[![devDependencies Status](https://david-dm.org/kunjan343/TypeNode/dev-status.svg)](https://david-dm.org/kunjan343/TypeNode?type=dev)

### Pre-require library
- `npm install -g nodemon`
- `npm install -g ts-node`
- `npm install -g tslint` <br>
or 
- Setup run commands to use it from local dependency.

### Installing dependency
- Run `npm install` to install app dependency.
- Use `npm install --save ******` to install new dependency or `npm install --save-dev ******` to install dev-dependency/types.

### Running project
- Run `set(windows)/export(linux) NODE_ENV=development/production`.
- This project uses `nodemon` to auto reflect new changes on development time.
- Simply run `npm run live` to reflect new changes.

### Production server
- Run `npm run build` to build project into javascript es2015 target.
- Run `npm start` to run the build project.

### Ts-lint project
- Run `npm run lint` to perform **tslint** on all source files.
- Config **tslint.json** to prefer your coding style.

## Core Libraries
- [ExpressJS](http://expressjs.com/) - node web framework
- [TypeORM](https://github.com/typeorm/typeorm) - TypeScript ORM framework for database operation
- [InversifyJS](https://github.com/inversify/InversifyJS) - TypeScript DI/IoC framework
- [Winston](https://github.com/winstonjs/winston) - provide logging on runtime development.
