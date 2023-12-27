import { ObjectType, ID } from "@nestjs/graphql";
import { FilterableField, IDField, FilterableUnPagedRelation, FilterableRelation } from '@ptc-org/nestjs-query-graphql';
import { FilmDTO } from "../films/film.dto";
import { PlanetDTO } from "../planets/planet.dto";
import { SpeciesDTO } from "../species/species.dto";
import { StarshipDTO } from "../starships/starship.dto";
import { VehicleDTO } from "../vehicles/vehicle.dto";

@ObjectType('Character')
@FilterableRelation('homeworld', () => PlanetDTO, { description: `A planet that this character was born on or inhabits.` })
@FilterableUnPagedRelation('films', () => FilmDTO, { description: `An array of films that this character has been in.` })
@FilterableUnPagedRelation('species', () => SpeciesDTO, { description: `An array of species that this character belongs to.` })
@FilterableUnPagedRelation('starships', () => StarshipDTO, { description: `An array of starships that this character has piloted.` })
@FilterableUnPagedRelation('vehicles', () => VehicleDTO, { description: `An array of vehicles that this character has piloted.` })
export class CharacterDTO {
  @IDField(() => ID)
  id: string;

  @FilterableField({ description: `The name of this character.` })
  name: string;

  @FilterableField({ description: `The birth year of the character, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope.` })
  birthYear: string;

  @FilterableField({ description: `The eye color of this character. Will be "unknown" if not known or "n/a" if the character does not have an eye.` })
  eyeColor: string;

  @FilterableField({ description: `The gender of this character. Either "Male", "Female" or "unknown", "n/a" if the character does not have a gender.` })
  gender: string;

  @FilterableField({ description: `The hair color of this character. Will be "unknown" if not known or "n/a" if the character does not have hair.` })
  hairColor: string;

  @FilterableField({ description: `The height of the character in centimeters` })
  height: string;

  @FilterableField({ description: `The mass of the character in kilograms.` })
  mass: string;

  @FilterableField({ description: `The skin color of this character.` })
  skinColor: string;
}
