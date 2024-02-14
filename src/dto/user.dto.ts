import { Trim } from "class-sanitizer";
import { IsEmail, IsInt, IsNotEmpty, IsString, Length, MinLength } from "class-validator";

export class UserDto {
    @IsString()
    @Length(1, 25, {message: "l'erreur vient du firstname"})
    @IsNotEmpty()
    @Trim()
    firstname: string 
    @IsString()
    @IsNotEmpty()
    @Trim()
    @Length(1, 50, {message: "l'erreur vient du lastname"})
    lastname: string
    @IsString()
    @IsEmail()
    @Trim()
    @IsNotEmpty()
    email: string
    @IsString()
    @Trim()
    @IsNotEmpty()
   // @Length(12, 30)
    password: string
    @IsString()
    @Length(1, 250, {message: "l'erreur vient de address"})
    @Trim()
    @IsNotEmpty()
    address: string
    @IsString()
    @IsNotEmpty()
    @Trim()
    @MinLength(5, {message: "l'erreur vient du zip"})
    zip: string
    @IsString()
    @Length(1,50, {message: "l'erreur vient de city"})
    @Trim()
    @IsNotEmpty()
    city: string
    @IsString()
    @Trim()
    @IsNotEmpty()
    phone: string
   
}

export class CreateUserWithCompany extends UserDto {
    @IsString()
    @Length(1, 50)
    @IsNotEmpty()
    name: string
    @IsString()
    siret: string
    @IsString()
    @Length(0, 255)
    description: string
    owner:number
}

export class ResetPwd {
    @IsString()
    @IsNotEmpty()
   // @Length(12, 30)
    oldPassword: string
    @IsString()
    @IsNotEmpty()
   // @Length(12, 30)
    newPassword: string
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string
}

export class RejoinCompany {
    @IsInt()
    @IsNotEmpty()
    id: number
}
