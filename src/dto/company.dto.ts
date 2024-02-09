import { IsNotEmpty, IsString, Length } from "class-validator";

export class CompanyDto {
    @IsString()
    @Length(1, 50)
    @IsNotEmpty()
    name: string
    @IsString()
    siret: string
    @IsString()
    @Length(0, 255)
    description: string
    owner:number
}

