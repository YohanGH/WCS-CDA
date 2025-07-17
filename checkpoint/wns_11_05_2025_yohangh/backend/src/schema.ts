import { buildSchema } from "type-graphql";
import { CountryResolver } from "./resolvers/CountryResolver";
import { ContinentResolver } from "./resolvers/ContinentResolver";

export default buildSchema({
  resolvers: [CountryResolver, ContinentResolver],
});
