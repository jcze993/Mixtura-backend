/* import { PartialType } from '@nestjs/mapped-types'; */

import { IsEmail, MaxLength, MinLength } from "class-validator";

export class UpdateAuthDto{
 @IsEmail()
 email:string;

 @MinLength(4)
 @MaxLength(12)
 password: string;
}
