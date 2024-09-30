import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ad } from "./ad";


@Entity({ name: 'category'})
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 255 })
    title!: string;

    @OneToMany(() => Ad, (ad) => ad.category)
    ads!: Ad[];
}
