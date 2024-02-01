import { IsInt, IsString, Length, Max, Min } from "class-validator";

export class DocumentDto {
    @IsString()
    @Length(1, 250)
    path:string;
    @IsInt()
    @Max(20)
    type:number
}

export class CreateDocumentDto extends DocumentDto {
    @IsInt()
    @Min(1)
    project: number;
}

export const cleanResDataDocument = {
    id: true,
    path: true,
    type: true,
    project: {id:true}
  }

export const cleanResDataDocumentForDel = {
    id: true,
    project: {id: true, owner: {id: true}}
}
