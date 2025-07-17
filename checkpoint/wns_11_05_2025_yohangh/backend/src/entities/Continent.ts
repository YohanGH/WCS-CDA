import { Field, InputType, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Country } from "./Country";

@Entity()
@ObjectType()
export class Continent extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => Country, (country) => country.continent, { cascade: true })
  countries: Country[];
}

@InputType()
export class NewContinentInput {
  @Field()
  name: string;
}
