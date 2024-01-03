import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { CategoryVisibility } from "../enums/category.visiblity.enum";
import { Task } from "./task.entity";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar"})
    name: string;

    // Permet au user de créer une catégorie pour lui
    @Column({type:"enum"})
    visibility: CategoryVisibility;
    @ManyToOne (() => User, user => user.myCreateCategories) user:User;
    @OneToMany (() => Task, task => task.category) tasks: Task[];

}