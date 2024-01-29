import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Step } from "./step.entity";
import { Category } from "./category.entity";
import { Project } from "./project.entity";
import {StatusEnum} from "../enums/status.enum";

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar"})
    name: string;

    @Column({type:"varchar"})
    description: string;

    @Column({type:"enum", enum:StatusEnum, default:StatusEnum.IN_PROGRESS})
    status: StatusEnum

    @Column({type:"int"})
    budget: number;

    @Column({type:"date"})
    startDate: Date;

    @Column({type:"date"})
    endDate: Date;

    @ManyToMany (() => User, {cascade: true})
    @JoinTable()
    users: User[]

    @ManyToOne (() => Step, step => step.tasks) step:Step;
    @ManyToOne (() => Project, project => project.tasks) project:Project;
    @ManyToOne (() => User, owner => owner.myOwnTasks) owner:User;
    @ManyToOne (() => Category, category => category.tasks) category:Category;

}