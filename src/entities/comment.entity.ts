import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({name:"comment"})
export class CommentEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar"})
    content: string;

    @Column({type:"varchar"})
    table: string;

    @Column({type:"int"})
    idParent: number;

    @ManyToOne (() => UserEntity, author => author.comments) author: UserEntity;

}