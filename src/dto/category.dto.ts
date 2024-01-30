import { IsInt, IsString, Length, Min } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @Length(1, 50)
    name:string;
}
