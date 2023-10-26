import { IsNotEmpty, IsUUID } from 'class-validator';
import { MessagesHelper } from 'src/modules/helpers/message.helper';

export class ChangeStatusTaskParam {
  @IsNotEmpty({ message: MessagesHelper.TASK_ID_REQUIRED })
  @IsUUID(undefined, { message: MessagesHelper.TASK_ID_INVALID })
  taskId: string;
}
