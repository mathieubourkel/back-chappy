import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../enums/status.enum";
import { Step } from "./step.entity";
import { User } from "./user.entity";
import { Purchase } from "./purchase.entity";
import { Document } from "./document.entity";
import { Task } from "./task.entity";

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

    @Column({type:"int"})
    status: number

    @Column({type:"int"})
    budget: number;

    @Column({type:"timestamp"})
    estimEndDate: Date;

    @ManyToMany (() => User, {cascade: true})
    @JoinTable()
    users: User[]

    @ManyToOne (() => User, owner => owner.projects) owner:User;

    @OneToMany (() => Purchase, purchase => purchase.project) purchases: Purchase[];
    @OneToMany (() => Step, step => step.project) steps: Step[];
    @OneToMany (() => Task, task => task.project) tasks: Task[];
    @OneToMany (() => Document, document => document.project) documents: Document[];

}