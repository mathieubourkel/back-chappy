import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";
import { User } from "./user.entity";

@Entity()
export class Company {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar"})
    name: string;

    @Column({type:"int"})
    siret: number;

    @Column({type:"varchar"})
    description: string;

    @ManyToMany (() => Project, {cascade: true})
    @JoinTable()
    projects: Project[]
    
    @ManyToOne (type => User, User => User.comments) User:User[];
    @OneToOne (type => User, User => User.comments) User:User;

}