import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, ID } from 'type-graphql';
import { Ad } from "./ad";
import { User } from "./user";

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

    @Field()
    @CreateDateColumn()
    createdAt!: Date; // The date and time when the category was created

    @ManyToOne(() => User)
    @Field(() => User)
    createdBy!: User;
}