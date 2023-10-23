import { Inject, Injectable } from "@nestjs/common";
import { TaskRepository } from "../../repository/task.repository";
import { ITaskRepository } from "../../structure/IRepository.structure";
import { IUpdateTask, IUpdateTasksService } from "../../structure/IService.structure";
import { Task } from "@prisma/client";

@Injectable()
export class UpdateTaskService implements IUpdateTasksService {

  constructor(
    @Inject(TaskRepository)
    private readonly taskRepository: ITaskRepository,
  ) {}
  async execute(id: string, body: IUpdateTask ): Promise<Task> {    
    return this.taskRepository.update({id, name:body.name, description: body.description})
  }
}