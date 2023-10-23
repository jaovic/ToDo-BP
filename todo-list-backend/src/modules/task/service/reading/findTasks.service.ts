import { Inject, Injectable } from "@nestjs/common";
import { TaskRepository } from "../../repository/task.repository";
import { ITaskRepository } from "../../structure/IRepository.structure";
import { Task } from "@prisma/client";
import { IFindTasks, IFindTasksService } from "../../structure/IService.structure";

@Injectable()
export class FindTasksService implements IFindTasksService {

  constructor(
    @Inject(TaskRepository)
    private readonly taskRepository: ITaskRepository,
  ) {}
  async execute(data: IFindTasks ): Promise<Task[]> {
    return this.taskRepository.findTasks(data.id,{page: data.page})
  }
}