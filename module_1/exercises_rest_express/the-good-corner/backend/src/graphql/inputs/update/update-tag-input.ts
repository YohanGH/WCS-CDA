import { InputType, Field } from 'type-graphql';
import { MaxLength } from 'class-validator';

@InputType() // This class is used to update tag information
export class UpdateTagInput {
  @Field({ nullable: true })
  @MaxLength(255, { message: 'The title cannot exceed 255 characters' })
  title?: string; // The title of the tag
}