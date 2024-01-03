import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../enums/status.enum";
import { Step } from "./step.entity";
import { User } from "./user.entity";
import { Purchase } from "./purchase.entity";
import { Company } from "./company.entity";
import { Document } from "./document.entity";

@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar"})
    name: string;

    @Column({type:"varchar"})
    description: string;

    @Column({type:"varchar"})
    code: string;

    @Column({type:"enum", enum: Status})
    status: Status

    @Column({type:"int"})
    budget: number;

    @Column({type:"date"})
    estimEndDate: Date;

    @ManyToMany (() => User, {cascade: true})
    @JoinTable()
    users: User[]

    @ManyToMany (() => Company, {cascade: true})
    @JoinTable()
    companies: Company[]

    @ManyToOne (() => User, owner => owner.projects) owner:User;

    @OneToMany (() => Purchase, purchase => purchase.project) purchases: Purchase[];
    @OneToMany (() => Step, step => step.project) steps: Step[];
    @OneToMany (() => Document, document => document.project) documents: Document[];

}