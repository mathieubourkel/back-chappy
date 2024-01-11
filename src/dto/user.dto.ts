import { IsEmail, IsInt, IsNotEmpty, IsString, Length, Min } from "class-validator";

export class CreateUserDto {
    @IsString()
    @Length(1, 25)
    @IsNotEmpty()
    firstname: string 
    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
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
    @IsNotEmpty()
    address: string
    @IsInt()
    @IsNotEmpty()
    @Min(5)
    zip: number
    @IsString()
    @IsNotEmpty()
    city: string
    @IsString()
    @IsNotEmpty()
    phone: string
    @IsString()
    @IsNotEmpty()
    status: string
    @IsString()
    @IsNotEmpty()
    role: string
    @IsString()
    @IsNotEmpty()
    refreshToken: string
    @IsInt()
    @Min(1)
    company: number
    @IsInt()
    @Min(1)
    project: number
    @IsInt()
    @Min(1)
    comment: number
    @IsInt()
    @Min(1)
    notification: number
    @IsInt()
    @Min(1)
    category: number
    @IsInt()
    @Min(1)
    task: number

    constructor(body: CreateUserDto) {
        const {firstname, lastname, email, password, address, zip, city, phone, status, role, refreshToken, company, project, comment, notification, category, task} = body;
        this.firstname = firstname,
        this.lastname = lastname,
        this.email = email,
        this.password = password,
        this.address = address,
        this.zip = zip,
        this.city = city,
        this.phone = phone,
        this.status= status,
        this.role = role,
        this.refreshToken = refreshToken,
        this.comment = company,
        this. project = project,
        this.comment = comment,
        this.notification = notification,
        this.category = category,
        this.task = task
    }
}

export class ModifyUserDto {
    
}