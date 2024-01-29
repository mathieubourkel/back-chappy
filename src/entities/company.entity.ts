import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";
import { User } from "./user.entity";

@Entity()
export class Company {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar"})
    name: string;

    @Column({type:"varchar"})
    siret: string;

    @Column({type:"varchar"})
    description: string;

    @ManyToMany (() => Project, {cascade: true})
    @JoinTable()
    projects: Project[]

    @OneToMany (() => User, user => user.company) users:User[];
    @OneToOne (() => User, owner => owner.company) owner:User;

}