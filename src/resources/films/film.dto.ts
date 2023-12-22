import { Int, ObjectType, ID } from "@nestjs/graphql";
import { FilterableField, IDField, FilterableRelation } from '@ptc-org/nestjs-query-graphql';
import { CharacterDTO } from "src/resources/characters/character.dto";
import { PlanetDTO } from "src/resources/planets/planet.dto";
import { SpeciesDTO } from "src/resources/species/species.dto";
import { StarshipDTO } from "src/resources/starships/starship.dto";
import { VehicleDTO } from "src/resources/vehicles/vehicle.dto";

@ObjectType('Film')
@FilterableRelation('species', () => SpeciesDTO, { description: `An array of species that are in this film.` })
@FilterableRelation('starships', () => StarshipDTO, { description: `An array of starships that are in this film.` })
@FilterableRelation('vehicles', () => VehicleDTO, { description: `An array of vehicles that are in this film.` })
@FilterableRelation('characters', () => CharacterDTO, { description: `An array of characters that are in this film.` })
@FilterableRelation('planets', () => PlanetDTO, { description: `An array of planets that are in this film.` })
export class FilmDTO {
  @IDField(() => ID)
  id: string;

  @FilterableField({ description: `The title of this film.` })
  title: string;

  @FilterableField(() => Int, { description: `The episode number of this film.` })
  episodeID: number;

  @FilterableField({ description: `The opening paragraphs at the beginning of this film.` })
  openingCrawl: string;

  @FilterableField({ description: `The name of the director of this film.` })
  director: string;

  @FilterableField({ description: `The name(s) of the producer(s) of this film. Comma separated.` })
  producer: string;

  @FilterableField({ description: `The ISO 8601 date format of film release at original creator country.` })
  releaseDate: string;
}
