import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";
import { UserStatus } from "../enums/user.status.enum";
import { Task } from "./task.entity";
import { UserRole } from "../enums/user.role.enum";
import { Company } from "./company.entity";
import { Category } from "./category.entity";
import { Comment } from "./comment.entity";
import { Notification } from "./notification.entity";

@Entity()
export class User {

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

    @Column({type:"int"})
    zip: number;

    @Column({type:"varchar"})
    city: string;

    @Column({type:"varchar"})
    phone: string;

    @Column({type:"enum", enum: UserStatus})
    status: UserStatus;

    @Column({type:"enum", enum: UserRole})
    role: UserRole;

    @Column({type:"text", nullable: true})
    refreshToken: string;

    @ManyToOne (() => Company, company => company.users) company: Company;
    @OneToOne  (() => Company, company => company.owner) myCompany: Company

    @OneToMany (() => Project, project => project.owner) projects:Project[];
    @OneToMany (() => Comment, comment => comment.author) comments:Comment[];
    @OneToMany (() => Notification, notification => notification.sender) mySentNotifications: Notification[]
    @OneToMany (() => Category, category => category.user) myCreateCategories: Category[];
    @OneToMany (() => Task, task => task.owner) myOwnTasks: Task[];
}