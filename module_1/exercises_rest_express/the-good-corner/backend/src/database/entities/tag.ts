import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ad } from "./ad";


@Entity({ name: 'tag'})
export class Tag extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @ManyToMany(() => Ad, (ad) => ad.tags)
        @JoinTable()
    ads!: Ad[];
}
