import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../enums/status.enum";
import { User } from "./user.entity";
import { Step } from "./step.entity";
import { Category } from "./category.entity";

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

    @ManyToOne (() => Step, step => step.tasks) step:Step;
    @ManyToOne (() => User, owner => owner.myOwnTasks) owner:User;
    @ManyToOne (() => Category, category => category.tasks) category:Category;

}