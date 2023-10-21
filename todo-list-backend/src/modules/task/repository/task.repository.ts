import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { ICreateTaskRepository, ITaskRepository } from "../structure/IRepository.structure";
import { Task } from "@prisma/client";

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: ICreateTaskRepository, categoryId: string): Promise<Task> {
    return await this.prisma.task.create({
      data:{
        name: data.name,
        description: data.description,
        userId: data.userId,
        categoryId
      }
    })
  }

  async findTasks(id: string): Promise<Task[]> {
    return this.prisma.task.findMany({where:{userId: id},include:{category:{select:{name: true}}}})
  }

  async delete(id: string): Promise<true>{
  await this.prisma.task.delete({ where: { id } });
    return true;
  }
}