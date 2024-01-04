import { Type } from "class-transformer";
import { IsArray, IsEnum, IsInt, IsNumber, IsString, ValidateNested} from "class-validator";
import { Status } from "../enums/status.enum";

export class CheckIdDto {
    @IsInt()
    id: number
}

export class CreateProjectDto {
    @IsString()
    name:string;
    @IsString()
    description:string;
    @IsString()
    code:string;
    @IsEnum(Status)
    status:Status;
    @IsInt()
    budget:number;
    @IsString()
    estimEndDate:Date;
    @IsInt()
    owner:number;

    @IsArray()
    @IsNumber({}, {each: true})
    users:number[];

    constructor(body:CreateProjectDto) {
        this.name = body.name,
        this.description = body.description,
        this.code = body.code,
        this.status = body.status,
        this.budget = body.budget,
        this.estimEndDate = body.estimEndDate,
        this.owner = body.owner,
        this.users = body.users
    }
}

export class ModifyProjectDto {
    
}

export class AddUserToProjectDto {
    
}