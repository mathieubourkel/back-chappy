import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";
import { Task } from "./task.entity";
import {StatusEnum} from "../enums/status.enum";

@Entity()
// @Index('index_projectId', ['projectId'])
export class Step {

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
    estimEndDate: Date;

    @ManyToOne (() => Project, project => project.steps) project:Project;
    @OneToMany(() => Task, task => task.step) tasks: Task[];

}