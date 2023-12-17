import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Film } from "src/films/models/film.model";
import { Person } from "src/people/models/person.model";

@ObjectType()
export class Planet {
  @Field(type => Int, { description: `Unique identifier of this planet.` })
  id: number;

  @Field({ description: `The name of this planet.` })
  name: string;

  @Field({ description: `The diameter of this planet in kilometers.` })
  diameter: string;

  @Field({ description: `The number of standard hours it takes for this planet to complete a single rotation on its axis.` })
  rotationPeriod: string;

  @Field({ description: `The number of standard days it takes for this planet to complete a single orbit of its local star.` })
  orbitalPeriod: string;

  @Field({ description: `A number denoting the gravity of this planet, where "1" is normal or 1 standard G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs.` })
  gravity: string;

  @Field({ description: `The average population of sentient beings inhabiting this planet.` })
  population: string;

  @Field({ description: `The climate of this planet. Comma separated if diverse.` })
  climate: string;

  @Field({ description: `The terrain of this planet. Comma separated if diverse.` })
  terrain: string;

  @Field({ description: `The percentage of the planet surface that is naturally occurring water or bodies of water.` })
  surfaceWater: string;

  @Field(type => [Person], { description: `An array of people that live on this planet.` })
  residents: Person[];

  @Field(type => [Film], { description: `An array of films that this planet has appeared in.` })
  films: Film[];
}
