import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { MessagesHelper } from 'src/modules/helpers/message.helper';

export class FindTasksParam {
  @IsNotEmpty({ message: MessagesHelper.PAGE_REQUIRED })
  @IsString({ message: MessagesHelper.PAGE_INVALID })
  page: string;
}
