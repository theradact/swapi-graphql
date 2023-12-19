import { ObjectType, ID } from "@nestjs/graphql";
import { FilterableField, IDField, FilterableRelation, Relation } from '@ptc-org/nestjs-query-graphql';
import { FilmDTO } from "src/films/film.dto";
import { PlanetDTO } from "src/planets/planet.dto";
import { SpeciesDTO } from "src/species/species.dto";
import { StarshipDTO } from "src/starships/starship.dto";
import { VehicleDTO } from "src/vehicles/vehicle.dto";

@ObjectType('Person')
@Relation('homeworld', () => PlanetDTO, { description: `A planet that this person was born on or inhabits.` })
@FilterableRelation('films', () => FilmDTO, { description: `An array of films that this person has been in.` })
@FilterableRelation('species', () => SpeciesDTO, { description: `An array of species that this person belongs to.` })
@FilterableRelation('starships', () => StarshipDTO, { description: `An array of starships that this person has piloted.` })
@FilterableRelation('vehicles', () => VehicleDTO, { description: `An array of vehicles that this person has piloted.` })
export class PersonDTO {
  @IDField(() => ID)
  id: string;

  @FilterableField({ description: `The name of this person.` })
  name: string;

  @FilterableField({ description: `The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope.` })
  birthYear: string;

  @FilterableField({ description: `The eye color of this person. Will be "unknown" if not known or "n/a" if the person does not have an eye.` })
  eyeColor: string;

  @FilterableField({ description: `The gender of this person. Either "Male", "Female" or "unknown", "n/a" if the person does not have a gender.` })
  gender: string;

  @FilterableField({ description: `The hair color of this person. Will be "unknown" if not known or "n/a" if the person does not have hair.` })
  hairColor: string;

  @FilterableField({ description: `The height of the person in centimeters` })
  height: string;

  @FilterableField({ description: `The mass of the person in kilograms.` })
  mass: string;

  @FilterableField({ description: `The skin color of this person.` })
  skinColor: string;
}
