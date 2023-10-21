import { Module } from "@nestjs/common";
import { TaskRepository } from "src/modules/task/repository/task.repository";
import { PrismaService } from "src/prisma.service";

@Module({
    imports: [],
    controllers: [],
    providers: [TaskRepository, PrismaService],
  })
  export class CategoryModule {}
  