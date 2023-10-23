import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  ICreateTaskRepository,
  IFindTasksPaginationRepository,
  ITaskRepository,
  IUpdateTaskRepository,
} from '../structure/IRepository.structure';
import { Task } from '@prisma/client';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: ICreateTaskRepository, categoryId: string): Promise<Task> {
    try {
      return await this.prisma.task.create({
        data: {
          name: data.name,
          description: data.description,
          userId: data.userId,
          categoryId,
        },
        include:{
          category:{
            select:{
              name: true
            }
          }
        }
      });
    } catch (error) {
      throw new Error(`Prisma Error: ${error}`);
    }
  }

  async findTasks(
    id: string,
    pagination: IFindTasksPaginationRepository,
  ): Promise<Task[]> {
    const LIMIT_PER_PAGE = 10;
    const offset = Number(pagination.page - 1) * LIMIT_PER_PAGE;
    try {
      return this.prisma.task.findMany({
        skip: offset,
        take: LIMIT_PER_PAGE,
        where: {
          userId: id,
        },
        include: {
          category: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      });
    } catch (error) {
      throw new Error(`Prisma Error: ${error}`);
    }
  }

  async delete(id: string): Promise<true> {
    try {
      await this.prisma.task.delete({ where: { id } });
      return true;
    } catch (error) {
      throw new Error(`Prisma Error: ${error}`);
    }
  }

  async update(data: IUpdateTaskRepository): Promise<Task> {
    try {
      return this.prisma.task.update({
        where: {
          id: data.id,
        },
        data: {
          name: data.name,
          description: data.description,
        },
      });
    } catch (error) {
      throw new Error(`Prisma Error: ${error}`);
    }
  }

  async changeStatus(id: string): Promise<Task> {
    try {
      const existTask = await this.prisma.task.findUnique({
        where: {
          id,
        },
      });

      if (!existTask) {
        throw new Error(`Tarefa com o ID ${id} não encontrada.`);
      }

      const newStatus = !existTask.status;
      return await this.prisma.task.update({
        where: {
          id,
        },
        data: {
          status: newStatus,
        },
      });
    } catch (error) {
      throw new Error(`Prisma Error: ${error}`);
    }
  }
}
