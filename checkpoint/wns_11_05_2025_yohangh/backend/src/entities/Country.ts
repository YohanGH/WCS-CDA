import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import { ObjectType, Field, Int, InputType } from "type-graphql";
import { Continent } from "./Continent";
import { ObjectId } from "../utils";
import { MaxLength, MinLength } from "class-validator";

@ObjectType()
@Entity()
export class Country extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true, length: 3 })
  code: string;

  @Field()
  @Column({ length: 50 })
  name: string;

  @Field()
  @Column({ length: 4 })
  emoji: string;

  @ManyToOne(() => Continent, (c) => c.countries, {
    onDelete: "CASCADE",
    nullable: true,
  })
  @Field({ nullable: true })
  continent?: Continent;
}

@InputType()
export class NewCountryInput {
  @Field()
  @MinLength(2)
  @MaxLength(3)
  code: string;

  @Field()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @Field()
  @MaxLength(4)
  emoji: string;

  @Field(() => ObjectId, { nullable: true })
  continent?: ObjectId;
}
