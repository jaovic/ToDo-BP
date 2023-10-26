import { Task } from '@prisma/client';

export interface ICreateTask {
  userId: string;
  name: string;
  description: string;
  category: string;
}

export interface IUpdateTask {
  name?: string;
  description?: string;
}

export interface IFindTasks {
  id: string;
  page: number;
}

export interface ICreateTaskService {
  execute(data: ICreateTask): Promise<Task>;
}

export interface IFindTasksService {
  execute(data: IFindTasks): Promise<Task[]>;
}
export interface IDeleteTasksService {
  execute(id: string): Promise<true>;
}
export interface IUpdateTasksService {
  execute(id: string, body: IUpdateTask): Promise<Task>;
}
export interface IChangeStatusTasksService {
  execute(id: string): Promise<Task>;
}
