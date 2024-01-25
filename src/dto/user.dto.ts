import { IsEmail, IsInt, IsNotEmpty, IsString, Length, Min } from "class-validator";

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
    @IsInt()
    @IsNotEmpty()
    @Min(5, {message: "l'erreur vient du zip"})
    zip: number
    @IsString()
    @Length(1,50, {message: "l'erreur vient de city"})
    @IsNotEmpty()
    city: string
    @IsString()
    @IsNotEmpty()
    phone: string
   

    constructor(body: CreateUserDto) {
        const {firstname, lastname, email, password, address, zip, city, phone} = body;
        this.firstname = firstname,
        this.lastname = lastname,
        this.email = email,
        this.password = password,
        this.address = address,
        this.zip = +zip,
        this.city = city,
        this.phone = phone
       
       
    }
}

export class ModifyUserDto {
    
}