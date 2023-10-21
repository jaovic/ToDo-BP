import { Task } from "@prisma/client"

export interface ICreateTask {
    userId: string
    name: string
    description: string
    category: string
}

export interface ICreateTaskService {
    execute(data: ICreateTask): Promise<Task>;
}

export interface IFindTasksService {
    execute(id: string): Promise<Task[]>;
} 
export interface IDeleteTasksService {
    execute(id: string): Promise<true>;
} 