import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { ICategoryRepository, ICreateCategory, IFindCategory } from "../structure/IRepository.structure";
import { Category } from "@prisma/client";

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: ICreateCategory): Promise<Category> {
    return this.prisma.category.create({data})
}
async findCategory(data: IFindCategory): Promise<Category>{
    return this.prisma.category.findFirst({where:{
        name: data.name
    }})
}
}