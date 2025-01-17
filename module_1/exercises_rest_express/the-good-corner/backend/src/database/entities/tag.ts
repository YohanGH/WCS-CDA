import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, ID } from 'type-graphql';
import { Ad } from "./ad";
import { User } from "./user";

// This class represents a Tag entity in the database.
// Tags are used to categorize or label Ads, allowing for better organization and retrieval.
// Each Tag has a unique identifier (id) and a title, which describes the Tag.
// The Tag can also have many Ads associated with it, establishing a many-to-many relationship.
@ObjectType()
@Entity({ name: 'tag' })
export class Tag extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number; // Unique identifier for the tag

    @Field()
    @Column({ length: 255 })
    title!: string; // Title of the tag

    @Field(() => [Ad], { nullable: true }) // List of ads associated with this tag
    @ManyToMany(() => Ad, (ad) => ad.tags) // Many-to-many relationship with Ads
    ads?: Ad[]; // List of ads associated with this tag

    @Field()
    @CreateDateColumn()
    createdAt!: Date; // The date and time when the tag was created

    @ManyToOne(() => User)
    @Field(() => User)
    createdBy!: User;
}
