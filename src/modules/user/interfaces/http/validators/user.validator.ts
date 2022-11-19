import { IsUUID, IsNotEmpty } from 'class-validator';

export class UserListOneValidator {
  @IsUUID('4')
  @IsNotEmpty()
  guid!: string;
}
