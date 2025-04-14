import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field } from "type-graphql";

/**
 * Représente un pays dans le système.
 * L’entité Country stocke le code, le nom, l’emoji ainsi que le code du continent.
 */
@ObjectType() // Indique à TypeGraphQL que cette classe est un type GraphQL.
@Entity()     // Indique à TypeORM que cette classe est une entité persistée en base.
export class Country extends BaseEntity {
  @Field()             // Expose le champ dans le schéma GraphQL.
  @PrimaryColumn()     // Définit ce champ comme clé primaire.
  code!: string;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  emoji!: string;

  @Field()
  @Column()
  continentCode!: string;
}
