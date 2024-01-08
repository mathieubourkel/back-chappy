import { IsString, Length } from "class-validator";

export class CreateDocumentDto {
    @IsString()
    @Length(1, 250)
    path:string;
    @IsString()
    type:string;

    constructor(body:CreateDocumentDto) {      
        this.path = body.path,
        this.type = body.type
    }
}
