import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { CategoryVisibility } from "../enums/category.visiblity.enum";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar"})
    name: string;

    @Column({type:"enum"})
    visibility: CategoryVisibility;

    @ManyToOne (type => User, User => User.categories) User:User;

}