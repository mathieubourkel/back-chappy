import { IsArray, IsDateString, IsNumber, IsString, Length } from "class-validator";

export class NotificationDto {
    @IsString()
    @Length(1, 150)
    content:string;
    @IsString()
    @Length(1, 150)
    path:string;
    @IsDateString()
    sendDate:Date;
    isView:boolean
}

export class CreateNotificationDto extends NotificationDto {
    @IsArray()
    @IsNumber({}, {each: true})
    receivers: number[]
}