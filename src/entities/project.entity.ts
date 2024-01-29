import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StatusEnum } from "../enums/status.enum";
import { StepEntity } from "./step.entity";
import { UserEntity } from "./user.entity";
import { PurchaseEntity } from "./purchase.entity";
import { DocumentEntity } from "./document.entity";
import { TaskEntity } from "./task.entity";

@Entity()
export class ProjectEntity {
    static findOne(arg0: { code: any; }) {
      throw new Error("Method not implemented.");
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar"})
    name: string;

    @Column({type:"varchar"})
    description: string;

    @Column({type:"varchar"})
    code: string;

    @Column({type:"enum", enum:StatusEnum, default:StatusEnum.IN_PROGRESS})
    status: StatusEnum

    @Column({type:"int"})
    budget: number;

    @Column({type:"varchar"})
    estimEndDate: Date;

    @ManyToMany (() => UserEntity, (user) => user.participations, {cascade: true})
    @JoinTable()
    users: UserEntity[]

    @ManyToOne (() => UserEntity, owner => owner.projects) owner:UserEntity;

    @OneToMany (() => PurchaseEntity, purchase => purchase.project) purchases: PurchaseEntity[];
    @OneToMany (() => StepEntity, step => step.project) steps: StepEntity[];
    @OneToMany (() => TaskEntity, task => task.project) tasks: TaskEntity[];
    @OneToMany (() => DocumentEntity, document => document.project) documents: DocumentEntity[];

}