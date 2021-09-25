import * as fs from 'fs';
import { resolve } from 'path';

const packageFile = JSON.parse(fs.readFileSync(resolve(__dirname, '../package.json'), { encoding: 'utf-8' }));

packageFile.name = 'epiphyllum-server-production';
packageFile.scripts = undefined;

fs.writeFileSync(resolve(__dirname, '../dist/package.json'), JSON.stringify(packageFile));

console.log('Done.');
