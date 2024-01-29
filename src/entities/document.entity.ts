import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectEntity } from "./project.entity";
import { FileTypeEnum } from "../enums/type.enum";

@Entity()
export class DocumentEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar"})
    path: string;

    @Column({type:"enum", enum:FileTypeEnum})
    type: FileTypeEnum;

    @ManyToOne (() => ProjectEntity, project => project.documents) project:ProjectEntity;

}