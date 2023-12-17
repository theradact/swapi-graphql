import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Film } from "src/films/models/film.model";
import { Planet } from "src/planets/models/planet.model";
import { Species } from "src/species/models/species.model";
import { Starship } from "src/starships/models/starship.model";
import { Vehicle } from "src/vehicles/models/vehicle.model";

@ObjectType()
export class Person {
  @Field(type => Int, { description: `Unique identifier of this person.` })
  id: number;

  @Field({ description: `The name of this person.` })
  name: string;

  @Field({ description: `The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope.` })
  birthYear: string;

  @Field({ description: `The eye color of this person. Will be "unknown" if not known or "n/a" if the person does not have an eye.` })
  eyeColor: string;

  @Field({ description: `The gender of this person. Either "Male", "Female" or "unknown", "n/a" if the person does not have a gender.` })
  gender: string;

  @Field({ description: `The hair color of this person. Will be "unknown" if not known or "n/a" if the person does not have hair.` })
  hairColor: string;

  @Field({ description: `The height of the person in centimeters` })
  height: string;

  @Field({ description: `The mass of the person in kilograms.` })
  mass: string;

  @Field({ description: `The skin color of this person.` })
  skinColor: string;

  @Field(type => Planet, { description: `A planet that this person was born on or inhabits.` })
  homeworld: Planet;

  @Field(type => [Film], { description: `An array of films that this person has been in.` })
  films: Film[];

  @Field(type => [Species], { description: `An array of species that this person belongs to.` })
  species: Species[];

  @Field(type => [Starship], { description: `An array of starships that this person has piloted.` })
  starships: Starship[];

  @Field(type => [Vehicle], { description: `An array of vehicles that this person has piloted.` })
  vehicles: Vehicle[];
}
