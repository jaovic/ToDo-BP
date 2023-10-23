import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Put, Req, UseGuards } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { IChangeStatusTasksService, ICreateTaskService, IDeleteTasksService, IFindTasksService, IUpdateTasksService } from "./structure/IService.structure";
import { CreateTaskService } from "./service/writing/crateTask.service";
import { AuthGuard } from '@nestjs/passport';
import { FindTasksService } from "./service/reading/findTasks.service";
import { DeleteTaskParam } from "./dto/delete-task.dto";
import { DeleteTaskService } from "./service/writing/deleteTask.service";
import { UpdateTaskService } from "./service/writing/updateTask.service";
import { ChangeStatusTaskService } from "./service/writing/changeStatusTask.service";
import { UpdateTaskDto, UpdateTaskParam } from "./dto/update-task.dto";
import { ChangeStatusTaskParam } from "./dto/changeStatus-task.dto";
import { FindTasksParam } from "./dto/find-task.dto";

@Controller('task')
export class TaskController {
  constructor(
    @Inject(CreateTaskService)
    private readonly createTaskService: ICreateTaskService,
    @Inject(FindTasksService)
    private readonly findTasksService: IFindTasksService,
    @Inject(DeleteTaskService)
    private readonly deleteTaskService: IDeleteTasksService,
    @Inject(UpdateTaskService)
    private readonly updateTaskService: IUpdateTasksService,
    @Inject(ChangeStatusTaskService)
    private readonly changeStatusTaskService: IChangeStatusTasksService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  async createUser(@Body() body: CreateTaskDto) {
    return this.createTaskService.execute(body)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/findTasks/:page')
  async findTasks(@Param() param: FindTasksParam, @Req() req: any){
    return this.findTasksService.execute({id: req.user.id,page: Number(param.page)})
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete/:taskId')
  delete(@Param() param: DeleteTaskParam) {
    return this.deleteTaskService.execute(param.taskId)
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/update/:taskId')
  async updateTask(@Param() param: UpdateTaskParam, @Body() data: UpdateTaskDto) {
    return this.updateTaskService.execute(param.taskId, data)
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/changeStatus/:taskId')
  async changeStatus(@Param()  param: ChangeStatusTaskParam) {
    return this.changeStatusTaskService.execute(param.taskId)
  }
}