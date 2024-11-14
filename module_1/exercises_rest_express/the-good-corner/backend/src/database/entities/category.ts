import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, ID } from 'type-graphql';
import { Ad } from "./ad";

// This class represents a category entity in the database.
// It defines the structure of a category, including its unique identifier (id),
// the title of the category, and a one-to-many relationship with ads.
@ObjectType()
@Entity({ name: 'category' })
export class Category extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number; // Unique identifier for the category

    @Field()
    @Column({ length: 255 })
    title!: string; // Title of the category

    @Field(() => [Ad], { nullable: true }) // List of ads associated with this category
    @OneToMany(() => Ad, (ad) => ad.category) // One-to-many relationship with Ads
    ads?: Ad[]; // List of ads associated with this category
}