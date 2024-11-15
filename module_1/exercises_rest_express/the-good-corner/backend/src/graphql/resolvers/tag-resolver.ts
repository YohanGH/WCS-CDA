import { Resolver, Query, Arg, Int, Mutation } from "type-graphql";
import { Tag } from "../../database/entities/tag";
import { AppError } from "../../middlewares/error-handler";
import { CreateTagInput } from "../inputs/create/create-tag-input";
import { generateRandomTag } from "../../utils/generate-tag";
import { UpdateTagInput } from "../inputs/update/update-tag-input";
import dataSource from '../../database/config/datasource';

@Resolver(Tag)
export class TagResolver {
    // Get all tags
    @Query(() => [Tag])
    async tags(): Promise<Tag[]> {
        const tagRepository = dataSource.getRepository(Tag); // Get the tag repository
        const tags = await tagRepository.find({ relations: ['ads'] }); // Find all tags with their ads

        return tags;
    }

    // Get a tag by ID
    @Query(() => Tag)
    async tag(@Arg('id', () => Int) id: number): Promise<Tag> {
        const tagRepository = dataSource.getRepository(Tag); // Get the tag repository
        const tag = await tagRepository.findOne({ where: { id }, relations: ['ads'] }); // Find a tag by its id with its ads

        if (!tag) { // If the tag is not found, throw an error
            throw new AppError('Tag not found', 404, 'NotFoundError');
        }
        return tag;
    }

    // Create a new tag
    @Mutation(() => Tag)
    async createTag(@Arg('data') data: CreateTagInput): Promise<Tag> {
        const tagRepository = dataSource.getRepository(Tag); // Get the tag repository

        // Check if a tag with the same title already exists
        const existingTag = await tagRepository.findOne({ where: { title: data.title } });

        if (existingTag) { // If the tag already exists, throw an error
            throw new AppError('A tag with this title already exists', 400, 'ValidationError');
        }

        const tag = tagRepository.create({ ...data }); // Create a new tag
        return await tagRepository.save(tag); // Save the tag
    }

    // Create a random tag
    @Mutation(() => Tag)
    async generateRandomTag(): Promise<Tag> {
        const tagRepository = dataSource.getRepository(Tag); // Get the tag repository
        const randomData = generateRandomTag(); // Generate random tag data
        const tag = tagRepository.create({ ...randomData }); // Create a new tag
        return await tagRepository.save(tag); // Save the tag
    }

    // Update a tag partially (PATCH)
    @Mutation(() => Tag)
    async updateTag(
        @Arg('id', () => Int) id: number, // The id of the tag to update
        @Arg('data') data: UpdateTagInput // The data to update the tag
    ): Promise<Tag> {
        const tagRepository = dataSource.getRepository(Tag); // Get the tag repository

        const tag = await tagRepository.findOne({ where: { id }, relations: ['ads'] }); // Find a tag by its id with its ads

        if (!tag) { // If the tag is not found, throw an error
            throw new AppError('Tag not found', 404, 'NotFoundError');
        }

        Object.assign(tag, data); // Update the tag
        return await tagRepository.save(tag); // Save the tag
    }

    // Delete a tag
    @Mutation(() => Boolean)
    async deleteTag(@Arg('id', () => Int) id: number): Promise<boolean> {
        const tagRepository = dataSource.getRepository(Tag); // Get the tag repository

        const deleteResult = await tagRepository.delete(id); // Delete the tag

        if (deleteResult.affected === 0) { // If the tag is not found, throw an error
            throw new AppError('Tag not found', 404, 'NotFoundError');
        }
        return true; // Return true if the tag is deleted
    }
}