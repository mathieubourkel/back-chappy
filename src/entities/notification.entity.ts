import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Notification {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar"})
    content: string;

    @Column({type:"varchar"})
    path: string;

    @Column({type:"int"})
    timestamp: number;

    @Column({type:"bool"})
    isView: boolean;

    @ManyToMany (() => User, {cascade: true})
    @JoinTable()
    receivers: User[]

    @ManyToOne (() => User, sender => sender.mySentNotifications) sender:User;

}