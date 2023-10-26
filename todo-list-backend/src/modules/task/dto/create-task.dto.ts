import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { MessagesHelper } from 'src/modules/helpers/message.helper';

export class CreateTaskDto {
  @IsNotEmpty({ message: MessagesHelper.USER_ID_REQUIRED })
  @IsUUID()
  userId: string;
  @IsNotEmpty({ message: MessagesHelper.NAME_REQUIRED })
  @IsString({ message: MessagesHelper.NAME_INVALID })
  name: string;
  @IsNotEmpty({ message: MessagesHelper.DESCRIPTION_REQUIRED })
  @IsString({ message: MessagesHelper.DESCRIPTION_INVALID })
  description: string;
  @IsNotEmpty({ message: MessagesHelper.CATEGORY_REQUIRED })
  @IsString({ message: MessagesHelper.CATEGORY_INVALID })
  category: string;
}
