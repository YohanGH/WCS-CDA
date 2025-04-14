/**
 * @packageDocumentation
 * @category Resolvers
 * @description
 * This module provides GraphQL resolvers for country-related operations.
 * It handles country creation and retrieval (all countries and by continent).
 */

import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Country } from "../entity/Country";

@Resolver()
export class CountryResolver {
  /**
   * Creates a new country.
   * @param code - The country code (e.g. "FR", "BE", "US", etc.).
   * @param name - The name of the country (e.g. "France", "Belgium", "United States", etc.).
   * @param emoji - The emoji representing the country (e.g. "🇫🇷", "🇧🇪", "🇺🇸", etc.).
   * @param continentCode - The continent code where the country is located (e.g. "EU" for Europe, "NA" for North America).
   * @returns The newly created country object including its code, name, emoji, and continentCode.
   *
   * @example
   * ```graphql
   * mutation {
   *   createCountry(code: "FR", name: "France", emoji: "🇫🇷", continentCode: "EU") {
   *     code
   *     name
   *     emoji
   *     continentCode
   *   }
   * }
   * ```
   */
  @Mutation(() => Country)
  async createCountry(
    @Arg("code") code: string,
    @Arg("name") name: string,
    @Arg("emoji") emoji: string,
    @Arg("continentCode") continentCode: string
  ): Promise<Country> {
    const country = Country.create({ code, name, emoji, continentCode });
    await country.save();
    return country;
  }

  /**
   * Retrieves the list of all countries.
   * @returns An array of country objects, each containing the code, name, emoji, and continentCode.
   *
   * @example
   * ```graphql
   * query {
   *   countries {
   *     code
   *     name
   *     emoji
   *     continentCode
   *   }
   * }
   * ```
   */
  @Query(() => [Country])
  async countries(): Promise<Country[]> {
    return Country.find();
  }

  /**
   * Retrieves countries by continent.
   * @param continentCode - The continent code used to filter countries (e.g. "EU", "NA").
   * @returns An array of country objects that belong to the specified continent.
   *
   * @example
   * ```graphql
   * query {
   *   countriesByContinent(continentCode: "EU") {
   *     code
   *     name
   *     emoji
   *     continentCode
   *   }
   * }
   * ```
   */
  @Query(() => [Country])
  async countriesByContinent(
    @Arg("continentCode") continentCode: string
  ): Promise<Country[]> {
    return Country.find({ where: { continentCode } });
  }
}
