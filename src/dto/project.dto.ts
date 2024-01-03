import { Type } from "class-transformer";
import { IsArray, IsEnum, IsInt, IsString, ValidateNested} from "class-validator";
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
    estimEndDate:Date;
    @IsInt()
    owner:number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CheckIdDto)
    users:CheckIdDto[];

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