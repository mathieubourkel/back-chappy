import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity()
export class NotificationEntity {

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

    @ManyToMany (() => UserEntity, {cascade: true})
    @JoinTable()
    receivers: UserEntity[]

    @ManyToOne (() => UserEntity, sender => sender.mySentNotifications) sender:UserEntity;

}