// import curry from 'lodash-es/curry';
import { curry } from 'lodash';
import * as path from 'path';

export const findByName: Function = curry((name: string, item: any) => item.name === name);

export function getEntityDataFromProjectPackage(): string[] {
  const appDir = path.dirname(require.main.filename);
  const pathToPackageJSON: string = path.resolve(appDir, '../', 'package.json');
  const packageJSON: any = require(pathToPackageJSON);

  const name: string = packageJSON.name.replace('mw-', '').replace('-', '_');
  const version: string = packageJSON.version;

  return [name, version];
}
