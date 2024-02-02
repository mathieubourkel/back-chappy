import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectEntity } from "./project.entity";
import { UserStatusEnum } from "../enums/user.status.enum";
import { TaskEntity } from "./task.entity";
import { UserRoleEnum } from "../enums/user.role.enum";
import { CompanyEntity } from "./company.entity";
import { CategoryEntity } from "./category.entity";
import { CommentEntity } from "./comment.entity";

@Entity({name:"user"})
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar"})
    firstname: string;

    @Column({type:"varchar"})
    lastname: string;

    @Column({type:"varchar"})
    email: string;

    @Column({type:"varchar"})
    password: string;

    @Column({type: "varchar"})
    address: string

    @Column({type:"int"})
    zip: number;

    @Column({type:"varchar"})
    city: string;

    @Column({type:"varchar"})
    phone: string;

    @Column({type:"enum", enum: UserStatusEnum, default: UserStatusEnum.PENDING})
    status: UserStatusEnum;

    @Column({type:"enum", enum: UserRoleEnum, default: UserRoleEnum.USER})
    role: UserRoleEnum;

    @Column({type:"text", nullable: true})
    refreshToken: string;

    @ManyToOne (() => CompanyEntity, company => company.users) company: CompanyEntity;
    @OneToOne  (() => CompanyEntity, company => company.owner) myCompany: CompanyEntity;

    @OneToMany (() => ProjectEntity, project => project.owner) projects:ProjectEntity[];

    @ManyToMany(() => ProjectEntity, (participation) => participation.users)
    participations: ProjectEntity[];

    @OneToMany (() => CommentEntity, comment => comment.author) comments:CommentEntity[];
    @OneToMany (() => CategoryEntity, category => category.user) myCreateCategories: CategoryEntity[];
    @OneToMany (() => TaskEntity, task => task.owner) myOwnTasks: TaskEntity[];
}