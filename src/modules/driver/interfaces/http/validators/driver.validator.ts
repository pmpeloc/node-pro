import { IsUUID, IsNotEmpty } from 'class-validator';

export class DriverListOneValidator {
  @IsUUID('4')
  @IsNotEmpty()
  guid!: string;
}
