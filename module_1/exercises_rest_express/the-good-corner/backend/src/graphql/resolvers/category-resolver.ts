import { Resolver, Query, Mutation, Arg, Int, Authorized, Ctx } from 'type-graphql';
import { CreateCategoryInput } from '../inputs/create/create-category-input';
import { UpdateCategoryInput } from '../inputs/update/update-category-input';
import { Category } from '../../database/entities/category';
import { AppError } from '../../middlewares/error-handler';
import { generateRandomCategory } from '../../utils/generate-category';
import dataSource from '../../database/config/datasource';
import { AuthContext } from '../../types/types';

@Resolver(Category)
export class CategoryResolver {
    // Get all categories
    @Query(() => [Category])
    async categories(): Promise<Category[]> {
        const categoryRepository = dataSource.getRepository(Category); // Get the category repository
        const categories = await categoryRepository.find({ relations: ['ads'] }); // Find all categories with their ads

        return categories; // Return the categories
    }

    // Get a category by ID
    @Query(() => Category)
    async category(@Arg('id', () => Int) id: number): Promise<Category> {
        const categoryRepository = dataSource.getRepository(Category); // Get the category repository
        const category = await categoryRepository.findOne({ where: { id }, relations: ['ads'] }); // Find a category by its id with its ads

        if (!category) { // If the category is not found, throw an error
            throw new AppError('Category not found', 404, 'NotFoundError');
        }
        return category; // Return the category
    }

    // Create a new category
    @Authorized()
    @Mutation(() => Category)
    async createCategory(
        @Arg('data') data: CreateCategoryInput,
        @Ctx() context: AuthContext
    ): Promise<Category> {
        const user = context.user; // Get the user from the context

        // Check if the user is authenticated
        if (!user) {
            throw new AppError("User must be authenticated to create a category", 401, "UnauthorizedError");
        }

        // Check if the user is an admin
        if (user.role !== "admin") {
            throw new AppError("You are not authorized to create a category", 403, "ForbiddenError");
        }

        const categoryRepository = dataSource.getRepository(Category); // Get the category repository

        // Check if a category with the same title already exists
        const existingCategory = await categoryRepository.findOne({ where: { title: data.title } }); // Find a category by its title

        if (existingCategory) { // If the category already exists, throw an error
            throw new AppError('A category with this title already exists', 400, 'ValidationError');
        }

        // Create a new category instance from the input data
        const category = categoryRepository.create({
            title: data.title,
            createdBy: user,
        });

        return await categoryRepository.save(category); // Save the category
    }

    // Create a random category
    @Authorized()
    @Mutation(() => Category)
    async generateRandomCategory(): Promise<Category> { // Mutation to generate a random category
        const categoryRepository = dataSource.getRepository(Category); // Get the category repository
        const randomData = generateRandomCategory();
        const category = categoryRepository.create({ ...randomData }); // Create a new category
        return await categoryRepository.save(category); // Save the category
    }

    // Update a category partially (PATCH)
    @Authorized()
    @Mutation(() => Category)
    async updateCategory(
        @Arg('id', () => Int) id: number, // The id of the category to update
        @Arg('data') data: UpdateCategoryInput, // The data to update the category
        @Ctx() context: AuthContext // The context of the request
    ): Promise<Category> {
        const user = context.user; // Get the user from the context

        // Check if the user is authenticated
        if (!user) {
            throw new AppError("User must be authenticated to update a category", 401, "UnauthorizedError");
        }

        // Check if the user is an admin
        if (user.role !== "admin") {
            throw new AppError("You are not authorized to update a category", 403, "ForbiddenError");
        }

        const categoryRepository = dataSource.getRepository(Category); // Get the category repository
        const category = await categoryRepository.findOne({ where: { id }, relations: ['ads', 'createdBy'] }); // Find the category with its ads

        if (!category) { // If the category is not found, throw an error
            throw new AppError('Category not found', 404, 'NotFoundError');
        }

        // Verify the user is the creator
        if (category.createdBy.id !== user.id) {
            throw new AppError("You are not authorized to update this category", 403, "ForbiddenError");
        }

        Object.assign(category, data); // Update the category
        return await categoryRepository.save(category); // Save the category
    }

    // Delete a category
    @Authorized()
    @Mutation(() => Boolean)
    async deleteCategory(
        @Arg('id', () => Int) id: number,
        @Ctx() context: AuthContext
    ): Promise<boolean> {
        const user = context.user; // Get the user from the context

        // Check if the user is authenticated
        if (!user) {
            throw new AppError("User must be authenticated to delete a category", 401, "UnauthorizedError");
        }

        // Check if the user is an admin
        if (user.role !== "admin") {
            throw new AppError("You are not authorized to delete a category", 403, "ForbiddenError");
        }

        const categoryRepository = dataSource.getRepository(Category); // Get the category repository
        const category = await categoryRepository.findOne({ where: { id }, relations: ['ads', 'createdBy'] }); // Find the category with its ads

        if (!category) { // If the category is not found, throw an error
            throw new AppError('Category not found', 404, 'NotFoundError');
        }

        // Verify the user is the creator
        if (category.createdBy.id !== user.id) {
            throw new AppError("You are not authorized to delete this category", 403, "ForbiddenError");
        }

        const deleteResult = await categoryRepository.delete(id); // Delete the category
        if (deleteResult.affected === 0) { // If the category is not found, throw an error
            throw new AppError('Category not found', 404, 'NotFoundError');
        }
        return true; // Return true if the category is deleted
    }
}