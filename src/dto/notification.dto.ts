import { IsBoolean, IsString, Length } from "class-validator";

export class CreateNotificationDto {
    @IsString()
    @Length(1, 150)
    content:string;
    @IsString()
    @Length(1, 150)
    path:string;
    @IsBoolean()
    isView:boolean
    timestamp:Date;
}

export const cleanResDataPurchases = {
    ref: true,
    id: true,
    name: true,
    status: true,
    price: true,
    commandDate: true,
    deliveryDate: true,
    project: {id:true, users: {id: true}, owner: {id: true}}
  }