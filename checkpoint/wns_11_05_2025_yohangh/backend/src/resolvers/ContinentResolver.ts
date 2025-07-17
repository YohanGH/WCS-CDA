import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Continent, NewContinentInput } from "../entities/Continent";

@Resolver(Continent)
export class ContinentResolver {
  @Query(() => [Continent])
  async continents() {
    return Continent.find({ relations: { countries: true } });
  }

  @Mutation(() => Continent)
  async addContinent(@Arg("data") data: NewContinentInput) {
    const newContinent = new Continent();
    Object.assign(newContinent, data);
    const { id } = await newContinent.save();
    return Continent.findOne({ where: { id }, relations: { countries: true } });
  }
}
