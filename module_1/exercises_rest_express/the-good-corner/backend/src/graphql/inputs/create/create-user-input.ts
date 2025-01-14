import { InputType, Field } from 'type-graphql';
import { Length, IsEmail } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail({}, { message: 'The email must be valid.' })
  email!: string;

  @Field()
  @Length(6, 255, { message: 'The password must contain between 6 and 255 characters.' })
  password!: string;
}
