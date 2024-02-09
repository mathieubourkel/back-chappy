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
}

export class ModifyCommentDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2, { message: 'Votre commentaire doit contenir au moins deux caractères.'})
    @MaxLength(500, {message: 'Votre message est trop long.'})
    content:string;

}

export const dataComment = {
    content: true,
    id: true,
    author: {id: true, firstname: true, email: true, lastname: true},
    idParent: true,
    table: true,
  }

