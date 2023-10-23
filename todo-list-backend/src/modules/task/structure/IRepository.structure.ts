import { Task } from "@prisma/client";

export interface ICreateTaskRepository {
    userId: string
    name: string
    description: string
}

export interface IUpdateTaskRepository {
  id: string
  name?: string
  description?: string
}

export type IFindTasksPaginationRepository = {
  page: number;
};
  
  export interface ITaskRepository {
    create(data: ICreateTaskRepository, categoryId: string): Promise<Task>;
    findTasks(id: string, pagination: IFindTasksPaginationRepository): Promise<Task[]>
    delete(id: string): Promise<true>
    update(data: IUpdateTaskRepository): Promise<Task>
    changeStatus(id: string): Promise<Task>
  }