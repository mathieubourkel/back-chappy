import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectEntity } from "./project.entity";
import { FileTypeEnum } from "../enums/file.type.enum";

@Entity({name:"document"})
export class DocumentEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar"})
    path: string;

    @Column({type:"enum", enum:FileTypeEnum})
    type: FileTypeEnum;

    @ManyToOne (() => ProjectEntity, project => project.documents, { onDelete: "CASCADE" }) project:ProjectEntity;

}