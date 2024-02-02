import { IsArray, IsDateString, IsNumber, IsString, Length } from "class-validator";

export class CreateNotificationDto {
    @IsString()
    @Length(1, 150)
    content:string;
    @IsString()
    @Length(1, 150)
    path:string;
    @IsDateString()
    sendDate:Date;
    isView:boolean

    @IsArray()
    @IsNumber({}, {each: true})
    receivers: number[]
}