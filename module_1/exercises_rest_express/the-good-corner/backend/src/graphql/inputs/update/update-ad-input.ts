import { InputType, Field, Int } from 'type-graphql';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';

@InputType() // This class is used to update ad information
export class UpdateAdInput {
    @Field()
    @MaxLength(255, { message: 'The title must be at most 255 characters long' })
    @IsOptional()
    title?: string; // The title of the ad      

    @Field()
    @MaxLength(255, { message: 'The description must be at most 255 characters long' })
    @IsOptional()
    description?: string; // The description of the ad

    @Field()
    @MaxLength(255, { message: 'The owner must be at most 255 characters long' })
    @IsOptional()
    owner?: string; // The owner of the ad

    @Field()
    @MaxLength(255, { message: 'The picture must be at most 255 characters long' })
    @IsOptional()
    picture?: string; // The picture of the ad

    @Field()
    @MaxLength(255, { message: 'The location must be at most 255 characters long' })
    @IsOptional()
    location?: string; // The location of the ad    

    @Field(() => Int)
    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    categoryId?: number; // The category id of the ad   

    @Field(() => [Int])
    @IsNotEmpty()
    @IsArray()
    @IsOptional()
    tagIds?: number[]; // The tag ids of the ad
}
