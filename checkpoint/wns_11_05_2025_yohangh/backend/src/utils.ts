import { Max, Min } from "class-validator";
import { InputType, Field, Int } from "type-graphql";

@InputType()
export class ObjectId {
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  @Field(() => Int)
  id!: number;
}
