import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Task } from "./task.entity";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar"})
    name: string;

    @ManyToOne (() => User, user => user.myCreateCategories) user:User;
    @OneToMany (() => Task, task => task.category) tasks: Task[];

}