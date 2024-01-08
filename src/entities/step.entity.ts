import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";
import { Status } from "../enums/status.enum";
import { Task } from "./task.entity";

@Entity()
export class Step {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar"})
    name: string;

    @Column({type:"varchar"})
    description: string;

    @Column({type:"int"})
    status: number

    @Column({type:"int"})
    budget: number;

    @Column({type:"date"})
    estimEndDate: Date;

    @ManyToOne (() => Project, project => project.steps) project:Project;
    @OneToMany(() => Task, task => task.step) tasks: Task[];

}