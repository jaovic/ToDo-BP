import { Task } from "@prisma/client";

export interface ICreateTaskRepository {
    userId: string
    name: string
    description: string
  }
  
  export interface ITaskRepository {
    create(data: ICreateTaskRepository, categoryId: string): Promise<Task>;
    findTasks(id: string): Promise<Task[]>
    delete(id: string): Promise<true>
  }