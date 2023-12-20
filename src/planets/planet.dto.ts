import { ObjectType, ID } from "@nestjs/graphql";
import { FilterableField, IDField, FilterableRelation } from '@ptc-org/nestjs-query-graphql';
import { FilmDTO } from "src/films/film.dto";
import { CharacterDTO } from "src/characters/character.dto";

@ObjectType('Planet')
@FilterableRelation('residents', () => CharacterDTO, { description: `An array of characters that live on this planet.` })
@FilterableRelation('films', () => FilmDTO, { description: `An array of films that this planet has appeared in.` })
export class PlanetDTO {
  @IDField(() => ID)
  id: string;

  @FilterableField({ description: `The name of this planet.` })
  name: string;

  @FilterableField({ description: `The diameter of this planet in kilometers.` })
  diameter: string;

  @FilterableField({ description: `The number of standard hours it takes for this planet to complete a single rotation on its axis.` })
  rotationPeriod: string;

  @FilterableField({ description: `The number of standard days it takes for this planet to complete a single orbit of its local star.` })
  orbitalPeriod: string;

  @FilterableField({ description: `A number denoting the gravity of this planet, where "1" is normal or 1 standard G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs.` })
  gravity: string;

  @FilterableField({ description: `The average population of sentient beings inhabiting this planet.` })
  population: string;

  @FilterableField({ description: `The climate of this planet. Comma separated if diverse.` })
  climate: string;

  @FilterableField({ description: `The terrain of this planet. Comma separated if diverse.` })
  terrain: string;

  @FilterableField({ description: `The percentage of the planet surface that is naturally occurring water or bodies of water.` })
  surfaceWater: string;
}
