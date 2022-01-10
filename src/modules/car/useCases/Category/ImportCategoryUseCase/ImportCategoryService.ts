import { parse } from 'csv-parse';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';
import { CRepository } from '../../../infra/typeorm/repositories/Category/Repository';

export interface ImportCategory {
  name: string;
  description: string;
}

@injectable()
export class ImportCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepositrory: CRepository
  ) {}

  async execute(file: Express.Multer.File): Promise<void> {
    const categories: ImportCategory[] = await this.loadCategories(file);
    categories.forEach(async (c) => {
      const { description, name } = c;
      if (await this.categoryRepositrory.findByName(name)) return;
      await this.categoryRepositrory.create({ name, description });
    });
  }

  loadCategories(file: Express.Multer.File): Promise<ImportCategory[]> {
    return new Promise((r) => {
      const categories: ImportCategory[] = [];
      const stream = fs.createReadStream(file.path);
      const parseFile = parse();
      parseFile.on('data', async (l) => {
        const [name, description] = l;
        categories.push({ name, description });
      });
      stream.pipe(parseFile);
      parseFile.on('end', () => {
        fs.promises.unlink(file.path);
        return r(categories);
      });
    });
  }
}
