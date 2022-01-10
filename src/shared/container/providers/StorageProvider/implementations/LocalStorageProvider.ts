import { StorageProvider } from '../StorageProvider';

import fs from 'fs';
import { resolve } from 'path';
import { upload } from '@config/upload';

export class LocalStorageProvider implements StorageProvider {
  async save(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`, file)
    );
    return file;
  }
  async delete(file: string, folder: string): Promise<void> {
    const fileName = resolve(`${upload.tmpFolder}/${folder}`, file);
    try {
      await fs.promises.stat(fileName);
      await fs.promises.unlink(fileName);
    } catch (err) {
      return;
    }
  }
}
