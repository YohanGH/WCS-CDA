import { InputType, Field } from 'type-graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';

@InputType() // This class is used to create a new tag
export class CreateTagInput {
  @Field()
  @IsNotEmpty({ message: 'The title is required' })
  @MaxLength(255, { message: 'The title cannot exceed 255 characters' })
  title!: string; // The title of the tag
}