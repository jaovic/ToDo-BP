import { Body, Controller, Delete, Get, Inject, Param, Post, Req, UseGuards } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { ICreateTaskService, IDeleteTasksService, IFindTasksService } from "./structure/IService.structure";
import { CreateTaskService } from "./service/writing/crateTask.service";
import { AuthGuard } from '@nestjs/passport';
import { FindTasksService } from "./service/reading/findTasks.service";
import { DeleteTaskParam } from "./dto/delete-task.dto";
import { DeleteTaskService } from "./service/writing/deleteTask.service";

@Controller('task')
export class TaskController {
  constructor(
    @Inject(CreateTaskService)
    private readonly createTaskService: ICreateTaskService,
    @Inject(FindTasksService)
    private readonly findTasksService: IFindTasksService,
    @Inject(DeleteTaskService)
    private readonly deleteTaskService: IDeleteTasksService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  async createUser(@Body() body: CreateTaskDto) {
    return this.createTaskService.execute(body)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/findTasks')
  async findTasks(@Req() req: any){
    return this.findTasksService.execute(req.user.id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete/:taskId')
  delete(@Param() param: DeleteTaskParam) {
    return this.deleteTaskService.execute(param.taskId)
  }
}