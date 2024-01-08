import { IsDateString, IsInt, IsString, Length, Max, Min } from "class-validator";

export class CreatePurchaseDto {
    @IsString()
    @Length(1, 50)
    name:string;
    @IsString()
    ref:string;
    @IsInt()
    @Min(1)
    @Max(3)
    status:number;
    @IsInt()
    price:number;
    @IsDateString()
    commandDate:Date;
    @IsDateString()
    deliveryDate:Date;
    @IsInt()
    @Min(1)
    project: number;

    constructor(body:CreatePurchaseDto) {
        const {name, ref, status, price, commandDate, deliveryDate, project} = body;
        this.name = name,
        this.ref = ref,
        this.status = status,
        this.price = price,
        this.commandDate = commandDate,
        this.deliveryDate = deliveryDate,
        this.project = project
    }
}