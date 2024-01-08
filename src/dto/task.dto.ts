import { IsDateString, IsInt, IsString, Length, Max, Min} from "class-validator";

export class CreateTaskDto {
    @IsString()
    @Length(1, 50)
    name:string;
    @IsString()
    @Length(1, 250)
    description:string;
    @IsInt()
    @Min(1)
    @Max(3)
    status:number;
    @IsInt()
    budget:number;
    @IsDateString()
    startDate:Date;
    @IsDateString()
    endDate:Date;
    @IsInt()
    @Min(1)
    project:number;
    @IsInt()
    @Min(1)
    step:number;
    @IsInt()
    @Min(1)
    owner:number;
    @IsInt()
    @Min(1)
    category:number;

    constructor(body:CreateTaskDto) {
        const {name, description, status, budget, startDate, endDate, project, step, owner, category} = body;
        this.name = name,
        this.description = description,
        this.status = status,
        this.budget = budget,
        this.startDate = startDate,
        this.endDate = endDate,
        this.project = project,
        this.step = step,
        this.owner = owner,
        this.category = category
    }
}

export class ModifyTaskDto {
    
}