import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar"})
    content: string;

    @Column({type:"varchar"})
    table: string;

    @Column({type:"int"})
    idParent: number;

    @ManyToOne (type => User, User => User.comments) User:User;

}