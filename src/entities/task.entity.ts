import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../enums/status.enum";
import { UserEntity } from "./user.entity";
import { StepEntity } from "./step.entity";
import { CategoryEntity } from "./category.entity";
import { ProjectEntity } from "./project.entity";

@Entity()
export class TaskEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar"})
    name: string;

    @Column({type:"varchar"})
    description: string;

    @Column({type:"int"})
    status: number

    @Column({type:"int"})
    budget: number;

    @Column({type:"date"})
    startDate: Date;

    @Column({type:"date"})
    endDate: Date;

    @ManyToMany (() => UserEntity, {cascade: true})
    @JoinTable()
    users: UserEntity[]

    @ManyToOne (() => StepEntity, step => step.tasks) step:StepEntity;
    @ManyToOne (() => ProjectEntity, project => project.tasks) project:ProjectEntity;
    @ManyToOne (() => UserEntity, owner => owner.myOwnTasks) owner:UserEntity;
    @ManyToOne (() => CategoryEntity, category => category.tasks) category:CategoryEntity;
}