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

    author:number;

    @IsInt()
    @Min(1)
    idProject:number;

}

export class ModifyCommentDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2, { message: 'Votre commentaire doit contenir au moins deux caractères.'})
    @MaxLength(500, {message: 'Votre message est trop long.'})
    content:string;

}
