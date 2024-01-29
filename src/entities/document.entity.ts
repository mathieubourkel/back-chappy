import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectEntity } from "./project.entity";

@Entity()
export class DocumentEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar"})
    path: string;

    @Column({type:"varchar"})
    type: string;

    @ManyToOne (() => ProjectEntity, project => project.documents) project:ProjectEntity;

}