import { IsString, Length } from "class-validator";

export class LoginDto {
    @IsString()
    @Length(1, 50)
    email:string;
    @IsString()
    @Length(1, 250)
    password:string;
}