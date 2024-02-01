import { IsArray, IsDateString, IsInt, IsNumber, IsString, Length, Max} from "class-validator";

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
}
export class CreateProjectDto extends ProjectDto {

    @IsArray()
    @IsNumber({}, {each: true})
    users:number[]
    id:number
    code:string
    owner:number
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

export const cleanResDataUsersOnProject = {
    id: true,
    name: true,
    owner: { id: true, firstname: true, lastname: true },
    users: { id: true, firstname:true, lastname:true, myOwnTasks: {id: true}, company: {id:true, name: true} },
}