import { Trim } from "class-sanitizer";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CompanyDto {
    @IsString()
    @Length(1, 50)
    @Trim()
    @IsNotEmpty()
    name: string
    @Trim()
    @IsString()
    siret: string
    @IsString()
    @Trim()
    @Length(0, 255)
    description: string
    owner:number
}

