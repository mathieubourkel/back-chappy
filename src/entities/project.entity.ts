import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../enums/status.enum";
import { Step } from "./step.entity";
import { User } from "./user.entity";

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

    @Column({type:"enum", enum: Status})
    status: Status

    @Column({type:"int"})
    budget: number;

    @Column({type:"date"})
    estimEndDate: Date;

    @ManyToMany (() => User, {cascade: true})
    @JoinTable()
    users: User[]

    @OneToMany (type => Step, Step => Step.project) Steps: Step[];

}