import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";

@Entity()
export class Document {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar"})
    path: string;

    @Column({type:"varchar"})
    type: string;

    @ManyToOne (() => Project, project => project.documents) project:Project;

}