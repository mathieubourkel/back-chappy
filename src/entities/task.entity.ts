import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";
import { Status } from "../enums/status.enum";
import { User } from "./user.entity";

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar"})
    name: string;

    @Column({type:"varchar"})
    description: string;

    @Column({type:"enum", enum: Status})
    status: Status

    @Column({type:"int"})
    budget: number;

    @Column({type:"date"})
    startDate: Date;

    @Column({type:"date"})
    endDate: Date;

    @ManyToMany (() => User, {cascade: true})
    @JoinTable()
    users: User[]

    @ManyToOne (type => Project, Project => Project.steps) Project:Project;

}