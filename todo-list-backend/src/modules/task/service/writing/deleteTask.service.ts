import { Inject, Injectable } from '@nestjs/common';
import { TaskRepository } from '../../repository/task.repository';
import { ITaskRepository } from '../../structure/IRepository.structure';
import { IDeleteTasksService } from '../../structure/IService.structure';

@Injectable()
export class DeleteTaskService implements IDeleteTasksService {
  constructor(
    @Inject(TaskRepository)
    private readonly taskRepository: ITaskRepository,
  ) {}
  async execute(id: string): Promise<true> {
    return this.taskRepository.delete(id);
  }
}
