import {
    IsInt, IsNotEmpty,
    IsString,
    Length,
    MaxLength,
    Min,
    MinLength
} from "class-validator";


export class CreateCommentDto {
    @IsString()
    @MinLength(2, { message: 'Votre commentaire doit contenir au moins deux caractères.'})
    @MaxLength(500, {message: 'Votre message est trop long.'})
    content:string;

    @IsString()
    @Length(4,7)
    table:string;

    @IsInt()
    @Min(1)
    idParent:number;

    @IsInt()
    @Min(1)
    author:number;

    constructor(body:CreateCommentDto) {
        const {content, table, idParent, author} = body;
        this.content = content;
        this.table = table;
        this.idParent = idParent;
        this.author = author;
    }
}

export class ModifyCommentDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2, { message: 'Votre commentaire doit contenir au moins deux caractères.'})
    @MaxLength(500, {message: 'Votre message est trop long.'})
    content:string;

    constructor(body:ModifyCommentDto) {
        const {content} = body;
        this.content = content;

    }
}
