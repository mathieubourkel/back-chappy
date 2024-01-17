import { IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateCompanyDto {
    @IsString()
    @Length(1, 50)
    @IsNotEmpty()
    name: string
    @IsInt()
    @Length(14)
    @IsNotEmpty()
    siret: number
    @IsString()
    @IsNotEmpty()
    @Length(1, 255)
    description: string

    constructor(body: CreateCompanyDto) {
        const { name, siret, description } = body;
            this.name  = name,
            this.siret = siret,
            this.description = description
    }
}

export class ModifyCompanyDto {
    
}