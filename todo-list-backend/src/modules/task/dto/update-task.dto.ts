import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { MessagesHelper } from 'src/modules/helpers/message.helper';

export class UpdateTaskDto {
  @IsString({ message: MessagesHelper.NAME_INVALID })
  name?: string;
  @IsString({ message: MessagesHelper.DESCRIPTION_INVALID })
  description?: string;
}

export class UpdateTaskParam {
  @IsNotEmpty({ message: MessagesHelper.TASK_ID_REQUIRED })
  @IsUUID(undefined, { message: MessagesHelper.TASK_ID_INVALID })
  taskId: string;
}
