import { Resolver, Query, Mutation, Arg, Int } from "type-graphql";
import { Ad } from "../../database/entities/ad";
import { Category } from "../../database/entities/category";
import { Tag } from "../../database/entities/tag";
import { AppError } from "../../middlewares/error-handler";
import { CreateAdInput } from "../inputs/create/create-ad-input";
import { UpdateAdInput } from "../inputs/update/update-ad-input";
import { In } from "typeorm";
import dataSource from "../../database/config/datasource";
import { generateRandomAd } from "../../utils/generate-ad";

@Resolver(Ad)
export class AdResolver {
  // Get all ads
  @Query(() => [Ad]) // Query to get all ads
  async ads(
    @Arg("categoryId", () => Int, { nullable: true }) categoryId?: number
  ): Promise<Ad[]> {
    const adRepository = dataSource.getRepository(Ad); // Get the ad repository
    const whereClause = categoryId ? { category: { id: categoryId } } : {};
    const ads = await adRepository.find({
      where: whereClause,
      relations: ["category", "tags"],
    }); // Find all ads with their category and tags

    return ads;
  }

  // Get ad by id
  @Query(() => Ad) // Query to get an ad by its id
  async ad(@Arg("id", () => Int) id: number): Promise<Ad> {
    // Get an ad by its id
    const adRepository = dataSource.getRepository(Ad);
    const ad = await adRepository.findOne({
      where: { id },
      relations: ["category", "tags"],
    }); // Find an ad by its id with its category and tags

    if (!ad) {
      // If the ad is not found, throw an error
      throw new AppError("Ad not found", 404);
    }
    return ad;
  }

  // Create ad
  @Mutation(() => Ad) // Mutation to create an ad
  async createAd(@Arg("data") data: CreateAdInput): Promise<Ad> {
    // Create an ad
    const adRepository = dataSource.getRepository(Ad);
    const categoryRepository = dataSource.getRepository(Category);
    const tagRepository = dataSource.getRepository(Tag);

    // Check if the category exists
    const category = await categoryRepository.findOne({
      where: { id: data.categoryId },
    });

    if (!category) {
      // If the category is not found, throw an error
      throw new AppError("Category not found", 404, "NotFoundError");
    }

    // Get tags if IDs are provided
    let tags: Tag[] = [];
    if (data.tagIds && data.tagIds.length > 0) {
      // If tags are provided, get them
      tags = await tagRepository.findBy({ id: In(data.tagIds) });
    }

    const ad = adRepository.create({
      // Create an ad
      title: data.title,
      description: data.description,
      category,
      tags,
    });

    return await adRepository.save(ad); // Save the ad
  }

  // Create a random ad
  @Mutation(() => Ad) // Mutation to create a random ad
  async generateRandomAd(): Promise<Ad> {
    // Generate a random ad
    const adRepository = dataSource.getRepository(Ad);
    const randomData = generateRandomAd();
    const ad = adRepository.create({ ...randomData }); // Create a new ad
    return await adRepository.save(ad); // Save the ad
  }

  // Update ad
  @Mutation(() => Ad) // Mutation to update an ad
  async updateAd(
    @Arg("id", () => Int) id: number, // Get an ad by its id
    @Arg("data") data: UpdateAdInput
  ): Promise<Ad> {
    const adRepository = dataSource.getRepository(Ad);
    const categoryRepository = dataSource.getRepository(Category);
    const tagRepository = dataSource.getRepository(Tag);

    const ad = await adRepository.findOne({
      where: { id },
      relations: ["category", "tags"],
    }); // Find an ad by its id with its category and tags
    if (!ad) {
      // If the ad is not found, throw an error
      throw new AppError("Ad not found", 404, "NotFoundError");
    }

    if (data.title !== undefined) {
      // If the title is provided, update the ad
      ad.title = data.title;
    }

    if (data.description !== undefined) {
      // If the description is provided, update the ad
      ad.description = data.description;
    }

    if (data.categoryId !== undefined) {
      // If the category is provided, update the ad
      const category = await categoryRepository.findOne({
        where: { id: data.categoryId },
      }); // Find the category
      if (!category) {
        // If the category is not found, throw an error
        throw new AppError("Category not found", 404, "NotFoundError");
      }
      ad.category = category;
    }

    if (data.tagIds !== undefined) {
      // If tags are provided, update the ad
      const tags = await tagRepository.findBy({ id: In(data.tagIds) });
      ad.tags = tags;
    }

    return await adRepository.save(ad); // Save the ad
  }

  // Delete ad
  @Mutation(() => Boolean) // Mutation to delete an ad
  async deleteAd(@Arg("id", () => Int) id: number): Promise<boolean> {
    // Delete an ad
    const adRepository = dataSource.getRepository(Ad);

    const deleteResult = await adRepository.delete(id);

    if (deleteResult.affected === 0) {
      // If the ad is not found, throw an error
      throw new AppError("Ad not found", 404, "NotFoundError");
    }

    return true; // Return true if the ad is deleted
  }
}
