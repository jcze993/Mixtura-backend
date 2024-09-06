import { IsNotEmpty } from "class-validator";
import { PartialType } from "@nestjs/swagger";
import { UpdateAuthDto } from "./update-auth.dto";
import { IsEmail, MaxLength, MinLength } from "class-validator";

export class CreateAuthDto extends PartialType(UpdateAuthDto){
 @IsNotEmpty()
 name:string
} 
