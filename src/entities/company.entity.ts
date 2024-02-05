import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToMany (() => ProjectEntity,(participation) => participation.companies)
    @JoinTable()
    participations: ProjectEntity[]

    @OneToMany (() => UserEntity, user => user.company) users:UserEntity[];
    @OneToOne (() => UserEntity, user => user.company)
    @JoinColumn()
    owner: UserEntity

}

export const resDataCompanyClean = {
    id: true,
    owner: {id: true}
}