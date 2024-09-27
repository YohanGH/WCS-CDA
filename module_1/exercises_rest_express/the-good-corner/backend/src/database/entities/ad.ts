import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail } from "class-validator";
import { Category } from "./category";
import { Tag } from "./tag";

@Entity({ name: 'ad'})
export class Ad extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column()
    @IsEmail()
    owner!: string;

    @Column()
    price!: number;

    @Column()
    picture!: string;

    @Column()
    location!: string;

    @ManyToOne(() => Category, (category) => category.ads, { eager: true })
    category!: Category;

    @ManyToMany(() => Tag, (tag) => tag.ads)
    tags!: Tag[];

    @CreateDateColumn()
    createdAt!: Date;
}
