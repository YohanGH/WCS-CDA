import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
@Entity({ name: 'user' }) // The name of the table in the database
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number; // Unique identifier for the user

    @Field()
    @Column({ length: 255, unique: true })
    email!: string; // User's email address

    @Column({ length: 255 })
    password!: string; // User's hashed password (not exposed via GraphQL)

    @Field()
    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date; // The date and time when the user was created

    @Field()
    @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt!: Date; // The date and time when the user was last updated
}