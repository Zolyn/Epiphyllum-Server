'use strict';
exports.__esModule = true;
var fs = require('fs');
var path_1 = require('path');
var packageFile = JSON.parse(fs.readFileSync((0, path_1.resolve)(__dirname, '../package.json'), { encoding: 'utf-8' }));
packageFile.name = 'epiphyllum-server-production';
packageFile.scripts = undefined;
fs.writeFileSync((0, path_1.resolve)(__dirname, '../dist/package.json'), JSON.stringify(packageFile));
console.log('Done.');
