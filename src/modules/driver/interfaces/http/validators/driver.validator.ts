import { IsUUID, IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class DriverListOneValidator {
  @IsUUID('4')
  @IsNotEmpty()
  guid!: string;
}

export class DriverInsertValidator {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  lastname!: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  driverLicense!: string;

  @IsString({ message: 'Photo cannot be empty' })
  @IsNotEmpty({ message: 'Photo is required' })
  photo!: string;
}
