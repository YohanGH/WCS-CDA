import { Resolver, Query, Arg, Int, Mutation, Authorized, Ctx } from "type-graphql";
import { Tag } from "../../database/entities/tag";
import { AppError } from "../../middlewares/error-handler";
import { CreateTagInput } from "../inputs/create/create-tag-input";
import { generateRandomTag } from "../../utils/generate-tag";
import { UpdateTagInput } from "../inputs/update/update-tag-input";
import dataSource from '../../database/config/datasource';
import { AuthContext } from "../../types/types";

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
    @Authorized()
    @Mutation(() => Tag)
    async createTag(
        @Arg('data') data: CreateTagInput,
        @Ctx() context: AuthContext
    ): Promise<Tag> {
        const user = context.user; // Get the user from the context

        // Check if the user is authenticated
        if (!user) {
            throw new AppError("User must be authenticated to create a tag", 401, "UnauthorizedError");
        }

        // Check if the user is an admin
        if (user.role !== "admin") {
            throw new AppError("You are not authorized to create a tag", 403, "ForbiddenError");
        }

        const tagRepository = dataSource.getRepository(Tag); // Get the tag repository

        // Check if a tag with the same title already exists
        const existingTag = await tagRepository.findOne({ where: { title: data.title } });

        if (existingTag) { // If the tag already exists, throw an error
            throw new AppError('A tag with this title already exists', 400, 'ValidationError');
        }

        const tag = tagRepository.create({
            ...data,
            createdBy: user,
        }); // Create a new tag

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
    @Authorized()
    @Mutation(() => Tag)
    async updateTag(
        @Arg('id', () => Int) id: number, // The id of the tag to update
        @Arg('data') data: UpdateTagInput, // The data to update the tag
        @Ctx() context: AuthContext
    ): Promise<Tag> {
        const user = context.user; // Get the user from the context

        // Check if the user is authenticated
        if (!user) {
            throw new AppError("User must be authenticated to update a tag", 401, "UnauthorizedError");
        }

        // Check if the user is an admin
        if (user.role !== "admin") {
            throw new AppError("You are not authorized to update a tag", 403, "ForbiddenError");
        }

        const tagRepository = dataSource.getRepository(Tag); // Get the tag repository

        const tag = await tagRepository.findOne({ where: { id }, relations: ['ads', 'createdBy'] }); // Find a tag by its id with its ads

        if (!tag) { // If the tag is not found, throw an error
            throw new AppError('Tag not found', 404, 'NotFoundError');
        }

        if (tag.createdBy.id !== user.id) {
            throw new AppError("You are not authorized to update this tag", 403, "ForbiddenError");
        }

        Object.assign(tag, data); // Update the tag
        return await tagRepository.save(tag); // Save the tag
    }

    // Delete a tag
    @Authorized()
    @Mutation(() => Boolean)
    async deleteTag(@Arg('id', () => Int) id: number, @Ctx() context: AuthContext): Promise<boolean> {
        const user = context.user; // Get the user from the context

        // Check if the user is authenticated
        if (!user) {
            throw new AppError("User must be authenticated to delete a tag", 401, "UnauthorizedError");
        }

        // Check if the user is an admin
        if (user.role !== "admin") {
            throw new AppError("You are not authorized to delete a tag", 403, "ForbiddenError");
        }

        const tagRepository = dataSource.getRepository(Tag); // Get the tag repository

        const tag = await tagRepository.findOne({ where: { id }, relations: ['createdBy'] }); // Find a tag by its id with its creator
        if (!tag) {
            throw new AppError('Tag not found', 404, 'NotFoundError');
        }

        // Check if the user is the creator
        if (tag.createdBy.id !== user.id) {
            throw new AppError("You are not authorized to delete this tag", 403, "ForbiddenError");
        }

        const deleteResult = await tagRepository.delete(id); // Delete the tag

        if (deleteResult.affected === 0) { // If the tag is not found, throw an error
            throw new AppError('Tag not found', 404, 'NotFoundError');
        }
        return true; // Return true if the tag is deleted
    }
}