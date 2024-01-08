import { IsInt, IsString, Length, Min } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @Length(1, 50)
    name:string;
    @IsInt()
    @Min(1)
    owner:number;

    constructor(body:CreateCategoryDto) {      
        this.name = body.name,
        this.owner = body.owner
    }
}
