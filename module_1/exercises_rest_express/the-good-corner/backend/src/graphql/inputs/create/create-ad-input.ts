import { InputType, Field, Int } from "type-graphql";
import { ArrayNotEmpty, IsArray, IsInt, IsNotEmpty, IsNumber, MaxLength, Min } from "class-validator";

@InputType() // This class is used to create a new ad
export class CreateAdInput {
  @Field()
  @IsNotEmpty()
  @MaxLength(255, { message: "The title must be at most 255 characters long" })
  title!: string; // The title of the ad

  @Field()
  @IsNotEmpty()
  @MaxLength(255, {
    message: "The description must be at most 255 characters long",
  })
  description!: string; // The description of the ad

  @Field()
  @IsNotEmpty()
  @MaxLength(255, { message: "The owner must be at most 255 characters long" })
  owner!: string; // The owner of the ad

  @Field()
  @IsNotEmpty()
  @IsNumber()
  price!: number; // The price of the ad

  @Field()
  @IsNotEmpty()
  @MaxLength(255, {
    message: "The picture must be at most 255 characters long",
  })
  picture!: string; // The picture of the ad

  @Field()
  @IsNotEmpty()
  @MaxLength(255, {
    message: "The location must be at most 255 characters long",
  })
  location!: string; // The location of the ad

  @Field(() => Int)
  @IsInt({ message: "The category id must be an integer" })
  @Min(1, { message: "The category id must be greater than or equal to 1" })
  categoryId!: number; // The category id of the ad

  @Field(() => [Int])
  @IsArray({ message: 'Les IDs des tags doivent être un tableau' })
  @ArrayNotEmpty({ message: 'Le tableau des IDs des tags ne doit pas être vide' })
  @IsInt({ message: "The tag ids must be an array of integers", each: true })
  tagIds?: number[]; // The tag ids of the ad
}
