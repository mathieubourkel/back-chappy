import { IsDateString, IsInt, IsString, Length, Max, Min} from "class-validator";

export class StepDto {
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


    constructor(body:StepDto) {
        const {name, description, status, budget, estimEndDate} = body
        this.name = name,
        this.description = description,
        this.status = status,
        this.budget = +budget,
        this.estimEndDate = estimEndDate
    }
}

export class CreateStepDto extends StepDto {
    @IsInt()
    @Min(1)
    project:number;

    constructor(body:CreateStepDto){
        super(body);
        this.project = +body.project
    }
}

export const cleanResDataStep = {
    description: true,
    id: true,
    name: true,
    status: true,
    budget: true,
    estimEndDate: true,
    tasks: {id: true},
    project: { id: true, owner: {id:true}, users: {id: true, email:true}},
  }

  export const cleanResDataStepForCheck = {
    id: true,
    project: { id: true, owner: {id:true}},
  }