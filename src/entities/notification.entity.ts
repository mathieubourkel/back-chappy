import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({name:"notification"})
export class NotificationEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar"})
    content: string;

    @Column({type:"varchar"})
    path: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    sendDate: Date;

    @Column({type:"bool", default: false})
    isView: boolean;

    @ManyToMany (() => UserEntity, {cascade: true})
    @JoinTable()
    receivers: UserEntity[]
}