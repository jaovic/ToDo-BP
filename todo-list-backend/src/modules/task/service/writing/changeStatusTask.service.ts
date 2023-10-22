import { Inject, Injectable } from "@nestjs/common";
import { TaskRepository } from "../../repository/task.repository";
import { ITaskRepository } from "../../structure/IRepository.structure";
import { Task } from "@prisma/client";
import { IChangeStatusTasksService } from "../../structure/IService.structure";

@Injectable()
export class ChangeStatusTaskService implements IChangeStatusTasksService {

  constructor(
    @Inject(TaskRepository)
    private readonly taskRepository: ITaskRepository,
  ) {}
  async execute(id: string): Promise<Task> {
    return this.taskRepository.changeStatus(id)
  }
}