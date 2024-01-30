import { IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateCompanyDto {
    @IsString()
    @Length(1, 50)
    @IsNotEmpty()
    name: string
    @IsString()
    @Length(14)
    @IsNotEmpty()
    siret: string
    @IsString()
    @IsNotEmpty()
    @Length(1, 255)
    description: string

}

export class ModifyCompanyDto {
    
}