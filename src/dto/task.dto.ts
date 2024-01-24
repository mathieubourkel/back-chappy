import { IsArray, IsDateString, IsInt, IsNumber, IsString, Length, Max, Min} from "class-validator";

export class TaskDto {
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
    startDate:Date;
    @IsDateString()
    endDate:Date;
    @IsInt()
    @Min(1)
    category:number;

    constructor(body:TaskDto) {
        const {name, description, status, budget, startDate, endDate, category} = body;
        this.name = name,
        this.description = description,
        this.status = status,
        this.budget = +budget,
        this.startDate = startDate,
        this.endDate = endDate,
        this.category = category
    }
}

export class CreateTaskDto extends TaskDto {
    @IsInt()
    @Min(1)
    project:number;
    @IsInt()
    @Min(1)
    step:number;
    @IsArray()
    @IsNumber({}, {each: true})
    users:number[];
    owner:number;

    constructor(body:CreateTaskDto){
        super(body)
        this.project = body.project,
        this.step = body.step,
        this.users = body.users
    }
}

export const cleanResDataTask = {
    description: true,
    id: true,
    name: true,
    status: true,
    budget: true,
    endDate: true,
    startDate: true,
    owner: {id: true},
    users: {id: true, email: true},
    category: {id:true, name: true}
  }