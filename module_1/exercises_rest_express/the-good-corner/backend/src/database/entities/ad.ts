import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, JoinTable } from "typeorm";
import { Category } from "./category";
import { Tag } from "./tag";

@Entity({ name: 'ad'})
export class Ad extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 255 })
    title!: string;

    @Column('text')
    description!: string;

    @Column()
    owner!: string;

    @Column("decimal", { precision: 10, scale: 2 })
    price!: number;

    @Column({ length: 255 })
    picture!: string;

    @Column({ length: 255 })
    location!: string;

    @ManyToOne(() => Category, (category) => category.ads, { eager: true, onDelete: 'CASCADE'})
    category!: Category;

    @ManyToMany(() => Tag, (tag) => tag.ads, {onDelete: 'CASCADE'})
        @JoinTable()
    tags!: Tag[];

    @CreateDateColumn()
    createdAt!: Date;
}
