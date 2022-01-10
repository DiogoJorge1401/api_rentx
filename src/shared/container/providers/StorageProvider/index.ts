import { container } from 'tsyringe';
import { LocalStorageProvider } from './implementations/LocalStorageProvider';
import { S3StorageProvider } from './implementations/S3StorageProvider';
import { StorageProvider } from './StorageProvider';

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};
container.registerSingleton<StorageProvider>(
  'StorageProvider',
  diskStorage[process.env.STORAGE_PROVIDER]
);
