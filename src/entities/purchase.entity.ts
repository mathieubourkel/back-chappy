import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";
import { PurchaseStatusEnum} from "../enums/purchase.status.enum";

@Entity()
export class Purchase {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar"})
    name: string;

    @Column({type:"varchar"})
    ref: string;

    @Column({type:"enum", enum:PurchaseStatusEnum, default:PurchaseStatusEnum.PENDING})
    status: PurchaseStatusEnum

    @Column({type:"int"})
    price: number;

    @Column({type:"date"})
    commandDate: Date;

    @Column({type:"date"})
    deliveryDate: Date;

    @ManyToOne (() => Project, project => project.purchases) project:Project;

}