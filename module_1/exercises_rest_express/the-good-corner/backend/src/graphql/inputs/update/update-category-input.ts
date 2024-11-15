import { InputType, Field } from 'type-graphql';

@InputType() // This class is used to update category information
export class UpdateCategoryInput {
  @Field({ nullable: true })
  title?: string; // The title of the category
}
