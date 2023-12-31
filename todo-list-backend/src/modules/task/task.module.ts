import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { CreateTaskService } from './service/writing/crateTask.service';
import { TaskRepository } from './repository/task.repository';
import { PrismaService } from 'src/prisma.service';
import { CategoryRepository } from '../category/repository/category.repository';
import { FindTasksService } from './service/reading/findTasks.service';
import { AuthRepository } from '../auth/repository/auth.repository';
import { DeleteTaskService } from './service/writing/deleteTask.service';
import { ChangeStatusTaskService } from './service/writing/changeStatusTask.service';
import { UpdateTaskService } from './service/writing/updateTask.service';

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [
    CreateTaskService,
    TaskRepository,
    PrismaService,
    CategoryRepository,
    FindTasksService,
    AuthRepository,
    DeleteTaskService,
    ChangeStatusTaskService,
    UpdateTaskService,
  ],
})
export class TaskModule {}
