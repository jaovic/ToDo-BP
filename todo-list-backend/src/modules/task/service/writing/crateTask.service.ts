import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ICreateTask, ICreateTaskService } from "../../structure/IService.structure";
import { TaskRepository } from "../../repository/task.repository";
import { ITaskRepository } from "../../structure/IRepository.structure";
import { CategoryRepository } from "src/modules/category/repository/category.repository";
import { ICategoryRepository } from "src/modules/category/structure/IRepository.structure";
import { Task } from "@prisma/client";
import { AuthRepository } from "src/modules/auth/repository/auth.repository";

@Injectable()
export class CreateTaskService implements ICreateTaskService {

  constructor(
    @Inject(TaskRepository)
    private readonly taskRepository: ITaskRepository,
    @Inject(CategoryRepository)
    private readonly categoryRepository: ICategoryRepository,
    @Inject(AuthRepository)
    private readonly authRepository: AuthRepository
  ) {}
  async execute(data: ICreateTask): Promise<Task> {
    const user = await this.authRepository.findById(data.userId)

    if(!user){
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const categoryExist = await this.categoryRepository.findCategory({name: data.category})

    let categoryId: string
    
    if(!categoryExist){
      const category = await this.categoryRepository.create({name: data.category})
      categoryId = category.id
    }

    categoryId = categoryExist.id

    return this.taskRepository.create(data,categoryId)
  }
}