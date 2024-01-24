import bodyParser from "body-parser";
import { IsArray, IsDateString, IsInt, IsNumber, IsString, Length, Max, Min} from "class-validator";

export class ProjectDto {
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

    constructor(body:ProjectDto) {
        const {name,description, status, budget, estimEndDate} = body;
        this.name = name,
        this.description = description,
        this.status = status,
        this.estimEndDate = estimEndDate,
        this.budget = +budget,
        this.estimEndDate = estimEndDate
    }
    
}
export class CreateProjectDto extends ProjectDto {

    @IsArray()
    @IsNumber({}, {each: true})
    users:number[];
    id:number

    constructor(body:CreateProjectDto) {
        super(body);
        this.users = body.users
    }
}

export const cleanResDataProject = {
    description: true,
    id: true,
    name: true,
    status: true,
    budget: true,
    estimEndDate: true,
    owner: { id: true },
    users: { id: true },
  }

  export const FullResDataProject = {
    description: true,
    id: true,
    name: true,
    status: true,
    budget: true,
    code: true,
    estimEndDate: true,
    owner: { id: true, firstname: true, lastname: true },
    users: { id: true },
    steps: true,
    documents: true,
    purchases: true
  }

export const cleanResDataProjectForDel = {
    id: true,
    owner: {id: true}
}