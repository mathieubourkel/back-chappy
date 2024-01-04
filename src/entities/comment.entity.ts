import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToOne (() => User, author => author.comments) author: User;

}