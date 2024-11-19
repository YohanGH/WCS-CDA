import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, JoinTable } from "typeorm";
import { ObjectType, Field, ID } from 'type-graphql';
import { Category } from "./category";
import { Tag } from "./tag";

// This class represents an Ad entity in the database.
// It defines the structure of an ad, including its unique identifier (id),
// the title, description, owner, price, picture, location, category, and tags.
@ObjectType()
@Entity({ name: 'ad' })
export class Ad extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number; // Unique identifier for the ad

    @Field()
    @Column({ length: 255 })
    title!: string; // Title of the ad

    @Field({ nullable: true })
    @Column('text', { nullable: true })
    description?: string; // Description of the ad

    @Field()
    @Column()
    owner!: string; // Owner of the ad

    @Field()
    @Column("decimal", { precision: 10, scale: 2 })
    price!: number; // Price of the ad

    @Field()
    @Column({ length: 255 })
    picture!: string; // Picture of the ad

    @Field()
    @Column({ length: 255 })
    location!: string; // Location of the ad

    @Field(() => Category) // Category of the ad
    @ManyToOne(() => Category, (category) => category.ads, { eager: true, onDelete: 'CASCADE' }) // Many-to-one relationship with Category
    category!: Category; // Category of the ad

    @Field(() => [Tag], { nullable: true }) // Tags associated with the ad
    @ManyToMany(() => Tag, (tag) => tag.ads) // Many-to-many relationship with Tags
    @JoinTable({ // Specifies the join table for the many-to-many relationship
        joinColumns: [
            {
                name: 'adId',
                referencedColumnName: 'id',
            },
        ],
        inverseJoinColumns: [
            {
                name: 'tagId',
                referencedColumnName: 'id',
            },
        ],
    })
    tags?: Tag[]; // Tags associated with the ad

    @Field()
    @CreateDateColumn()
    createdAt!: Date; // Creation date of the ad
}
