import { ObjectType, ID } from "@nestjs/graphql";
import { FilterableField, IDField, FilterableRelation, Relation } from '@ptc-org/nestjs-query-graphql';
import { CharacterDTO } from "../characters/character.dto";
import { FilmDTO } from "../films/film.dto";
import { PlanetDTO } from "../planets/planet.dto";

@ObjectType('Species')
@Relation('homeworld', () => PlanetDTO, { description: `A planet that this species originates from.` })
@FilterableRelation('characters', () => CharacterDTO, { description: `An array of characters that are a part of this species.` })
@FilterableRelation('films', () => FilmDTO, { description: `An array of Films that this species has appeared in.` })
export class SpeciesDTO {
  @IDField(() => ID)
  id: string;

  @FilterableField({ description: `The name of this species.` })
  name: string;

  @FilterableField({ description: `The classification of this species, such as "mammal" or "reptile".` })
  classification: string;

  @FilterableField({ description: `The designation of this species, such as "sentient".` })
  designation: string;

  @FilterableField({ description: `The average height of this species in centimeters.` })
  averageHeight: string;

  @FilterableField({ description: `The average lifespan of this species in years.` })
  averageLifespan: string;

  @FilterableField({ description: `A comma-separated string of common eye colors for this species, "none" if this species does not typically have eyes.` })
  eyeColors: string;

  @FilterableField({ description: `A comma-separated string of common hair colors for this species, "none" if this species does not typically have hair.` })
  hairColors: string;

  @FilterableField({ description: `A comma-separated string of common skin colors for this species, "none" if this species does not typically have skin.` })
  skinColors: string;

  @FilterableField({ description: `The language commonly spoken by this species.` })
  language: string;
}
