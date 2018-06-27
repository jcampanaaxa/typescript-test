import * as path from 'path';
import * as fs from 'fs';

export function getCertificateFromPath(pathToCertificate: string): string {
  try {
    return fs.readFileSync(path.join(__dirname, pathToCertificate)).toString();
  } catch (e) {
    const newError: ErrorClass.NoStackError = new ErrorClass.NoStackError(e);
    console.error(`${newError}`);
    return null;
  }
}
