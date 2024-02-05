import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Length,
    MinLength
} from "class-validator";

export class CreateUserDto {
    @IsString()
    @Length(1, 25, {message: "l'erreur vient du firstname"})
    @IsNotEmpty()
    firstname: string 
    @IsString()
    @IsNotEmpty()
    @Length(1, 50, {message: "l'erreur vient du lastname"})
    lastname: string
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string
    @IsString()
    @IsNotEmpty()
   // @Length(12, 30)
    password: string
    @IsString()
    @Length(1, 250, {message: "l'erreur vient de address"})
    @IsNotEmpty()
    address: string
    @IsString()
    @IsNotEmpty()
    @MinLength(5, {message: "l'erreur vient du zip"})
    zip: string
    @IsString()
    @Length(1,50, {message: "l'erreur vient de city"})
    @IsNotEmpty()
    city: string
    @IsString()
    @IsNotEmpty()
    phone: string
   
}

export class CreateUserWithCompany extends CreateUserDto {
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
}
