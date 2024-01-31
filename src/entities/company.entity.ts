import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectEntity } from "./project.entity";
import { UserEntity } from "./user.entity";

@Entity({name:"company"})
export class CompanyEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar"})
    name: string;

    @Column({type:"varchar"})
    siret: string;

    @Column({type:"varchar"})
    description: string;

    @ManyToMany (() => ProjectEntity, {cascade: true})
    @JoinTable()
    projects: ProjectEntity[]

    @OneToMany (() => UserEntity, user => user.company) users:UserEntity[];
    @OneToOne (() => UserEntity, owner => owner.company) owner:UserEntity;

}