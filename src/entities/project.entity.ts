import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StatusEnum } from "../enums/status.enum";
import { StepEntity } from "./step.entity";
import { UserEntity } from "./user.entity";
import { PurchaseEntity } from "./purchase.entity";
import { DocumentEntity } from "./document.entity";
import { TaskEntity } from "./task.entity";

@Entity({name:"project"})
export class ProjectEntity {

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

    @OneToMany (() => PurchaseEntity, purchase => purchase.project, {cascade: ["remove"]}) purchases: PurchaseEntity[];
    @OneToMany (() => StepEntity, step => step.project, {cascade: ["remove"]}) steps: StepEntity[];
    @OneToMany (() => TaskEntity, task => task.project, {cascade: ["remove"]}) tasks: TaskEntity[];
    @OneToMany (() => DocumentEntity, document => document.project, {cascade: ["remove"]}) documents: DocumentEntity[];

}