import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { TaskEntity } from "./task.entity";

@Entity()
export class CategoryEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar"})
    name: string;

    @ManyToOne (() => UserEntity, user => user.myCreateCategories) user:UserEntity;
    @OneToMany (() => TaskEntity, task => task.category) tasks: TaskEntity[];
}