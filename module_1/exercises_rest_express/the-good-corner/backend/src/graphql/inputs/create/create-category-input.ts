import { InputType, Field } from 'type-graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';

@InputType() // This class is used to create a new category
export class CreateCategoryInput {
  @Field()
  @IsNotEmpty({ message: "The title is required" })
  @MaxLength(255, { message: "The title cannot exceed 255 characters" })
  title!: string; // The title of the category
}