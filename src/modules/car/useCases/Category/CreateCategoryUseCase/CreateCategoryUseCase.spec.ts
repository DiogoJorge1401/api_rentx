import { AppError } from '@shared/errors/AppError';
import { CRepository } from '../../../infra/typeorm/repositories/Category/Repository';
import { CategoryRepositoryInMemory } from '../../../repositories/InMemory/CategoryRepositoryInMemory';
import { CreateCategoryService } from './CreateCategoryService';

interface FakeCategory {
  description: string;
  name: string;
}
const makeFakeCategory = (): FakeCategory => {
  return {
    description: 'Fake Description',
    name: 'Fake Name',
  };
};
describe('Create Category', () => {
  let createCategoryService: CreateCategoryService;
  let categoryRepositoryInMemory: CRepository;

  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    createCategoryService = new CreateCategoryService(
      categoryRepositoryInMemory
    );
  });

  it('should be able to create a new category', async () => {
    const category = await createCategoryService.execute(makeFakeCategory());
    expect(category).toHaveProperty('name');
    expect(category).toHaveProperty('description');
    expect(category).toHaveProperty('id');
    expect(category).toHaveProperty('created_at');
  });

  it('should not be able to create a new category with same name', async () => {
    await createCategoryService.execute(makeFakeCategory());
    expect(createCategoryService.execute(makeFakeCategory())).rejects.toEqual(
      new AppError('Category already exist!')
    );
  });
});
