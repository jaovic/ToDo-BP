import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaService } from './prisma.service';
import { TaskModule } from './modules/task/task.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [AuthModule,TaskModule, CategoryModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
