import { IsDateString, IsInt, IsString, Length, Max, Min} from "class-validator";

export class CreateStepDto {
    @IsString()
    @Length(1, 50)
    name:string;
    @IsString()
    @Length(1, 250)
    description:string;
    @IsInt()
    @Max(3)
    status:number;
    @IsInt()
    budget:number;
    @IsDateString()
    estimEndDate:Date;
    @IsInt()
    @Min(1)
    project:number;

    constructor(body:CreateStepDto) {
        const {name, description, status, budget, estimEndDate, project} = body
        this.name = name,
        this.description = description,
        this.status = status,
        this.budget = budget,
        this.estimEndDate = estimEndDate,
        this.project = project
    }
}

export class ModifyStepDto {
    
}