import { Category } from '@prisma/client';

export interface ICreateCategory {
  name: string;
}

export interface IFindCategory {
  name: string;
}

export interface ICategoryRepository {
  create(data: ICreateCategory): Promise<Category>;
  findCategory(data: IFindCategory): Promise<Category>;
}
