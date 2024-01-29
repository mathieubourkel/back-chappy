import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";
import {FileTypeEnum} from "../enums/type.enum";

@Entity()
export class Document {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar"})
    path: string;

    @Column({type:"enum", enum:FileTypeEnum})
    type: FileTypeEnum;

    @ManyToOne (() => Project, project => project.documents) project:Project;

}