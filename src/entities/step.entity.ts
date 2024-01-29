import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjectEntity } from "./project.entity";
import { StatusEnum } from "../enums/status.enum";
import { TaskEntity } from "./task.entity";

@Entity()
export class StepEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar"})
    name: string;

    @Column({type:"varchar"})
    description: string;

    @Column({type:"enum", enum:StatusEnum, default:StatusEnum.IN_PROGRESS})
    status: StatusEnum

    @Column({type:"int"})
    budget: number;

    @Column({type:"date"})
    estimEndDate: Date;

    @ManyToOne (() => ProjectEntity, project => project.steps) project:ProjectEntity;
    @OneToMany(() => TaskEntity, task => task.step) tasks: TaskEntity[];
}