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
    category: {id:true, name: true},
    step: {id: true},
    project: {id:true, users: {id: true}}
  }

  export const cleanResDataTaskForDel = {
    id: true,
    owner: {id: true},
    project: {id: true, owner: {id: true}},
    step: {id: true}
  }

  export const cleanResDataTaskCalendar = {
    description: true,
    id: true,
    name: true,
    status: true,
    budget: true,
    endDate: true,
    startDate: true,
    users: {id: true, email: true},
    category: {id:true, name: true},
    step: {id: true, name: true},
    project: { id: true, owner: {id: true}, users: {id: true}}
  }