import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ad } from "./ad";


@Entity({ name: 'tag'})
export class Tag extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 255 })
    title!: string;

    @ManyToMany(() => Ad, (ad) => ad.tags, { onDelete: 'CASCADE'})
    ads!: Ad[];
}
