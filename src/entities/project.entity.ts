import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Step } from "./step.entity";
import { User } from "./user.entity";
import { Purchase } from "./purchase.entity";
import { Document } from "./document.entity";
import { Task } from "./task.entity";
import {StatusEnum} from "../enums/status.enum";

@Entity()
export class Project {

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

    @ManyToMany (() => User, (user) => user.participations, {cascade: true})
    @JoinTable()
    users: User[]

    @ManyToOne (() => User, owner => owner.projects) owner:User;

    @OneToMany (() => Purchase, purchase => purchase.project) purchases: Purchase[];
    @OneToMany (() => Step, step => step.project) steps: Step[];
    @OneToMany (() => Task, task => task.project) tasks: Task[];
    @OneToMany (() => Document, document => document.project) documents: Document[];

}