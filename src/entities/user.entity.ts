import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";
import { Status } from "../enums/status.enum";
import { UserStatus } from "../enums/user.status.enum";
import { Task } from "./task.entity";
import { UserRole } from "../enums/user.role.enum";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar"})
    firstname: string;

    @Column({type:"varchar"})
    lastname: string;

    @Column({type:"varchar"})
    password: string;

    @Column({type:"int"})
    zip: number;

    @Column({type:"varchar"})
    city: string;

    @Column({type:"varchar"})
    phone: string;

    @Column({type:"enum"})
    status: UserStatus;

    @Column({type:"enum"})
    role: UserRole;

    @ManyToMany (() => Project, {cascade: true})
    @JoinTable()
    myProjects: Project[]

    @ManyToMany (() => Project, {cascade: true})
    @JoinTable()
    collabs: Project[]

    @ManyToMany (() => Task, {cascade: true})
    @JoinTable()
    tasks: Task[]

    @ManyToOne (type => Project, Project => Project.steps) Project:Project;

}