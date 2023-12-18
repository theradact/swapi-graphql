import { Film } from "src/films/models/film.model";
import { Person } from "src/people/models/person.model";
import { Planet } from "src/planets/models/planet.model";
import { Species } from "src/species/models/species.model";
import { Starship } from "src/starships/models/starship.model";
import { Vehicle } from "src/vehicles/models/vehicle.model";

export interface PaginatedResults<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<T>;
}

export type Resource = "films" | "people" | "planets" | "species" | "starships" | "vehicles";

export type MappedResourceModel<T> =
  T extends "films" ? Film :
  T extends "people" ? Person :
  T extends "planets" ? Planet :
  T extends "species" ? Species :
  T extends "starships" ? Starship :
  T extends "vehicles" ? Vehicle :
  never;

export interface ResourceMeta {
  url: string;      // the hypermedia URL of this resource.
  created: string;  // the ISO 8601 date format of the time that this resource was created.
  edited: string;   // the ISO 8601 date format of the time that this resource was edited.
}

export interface FilmResource extends ResourceMeta {
  title: string;          // The title of this film
  episode_id: number;     // The episode number of this film.
  opening_crawl: string;  // The opening paragraphs at the beginning of this film.
  director: string;       // The name of the director of this film.
  producer: string;       // The name(s) of the producer(s) of this film. Comma separated.
  release_date: string;   // The ISO 8601 date format of film release at original creator country.
  species: string[];      // An array of species resource URLs that are in this film.
  starships: string[];    // An array of starship resource URLs that are in this film.
  vehicles: string[];     // An array of vehicle resource URLs that are in this film.
  characters: string[];   // An array of people resource URLs that are in this film.
  planets: string[];      // An array of planet resource URLs that are in this film.
}

export interface PersonResource extends ResourceMeta {
  name: string;         // The name of this person.
  birth_year: string;   // The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope.
  eye_color: string;    // The eye color of this person. Will be "unknown" if not known or "n/a" if the person does not have an eye.
  gender: string;       // The gender of this person. Either "Male", "Female" or "unknown", "n/a" if the person does not have a gender.
  hair_color: string;   // The hair color of this person. Will be "unknown" if not known or "n/a" if the person does not have hair.
  height: string;       // The height of the person in centimeters.
  mass: string;         // The mass of the person in kilograms.
  skin_color: string;   // The skin color of this person.
  homeworld: string;    // The URL of a planet resource, a planet that this person was born on or inhabits.
  films: string[];      // An array of film resource URLs that this person has been in.
  species: string[];    // An array of species resource URLs that this person belongs to.
  starships: string[];  // An array of starship resource URLs that this person has piloted.
  vehicles: string[];   // An array of vehicle resource URLs that this person has piloted.
}

export interface PlanetResource extends ResourceMeta {
  name: string;             // The name of this planet.
  diameter: string;         // The diameter of this planet in kilometers.
  rotation_period: string;  // The number of standard hours it takes for this planet to complete a single rotation on its axis.
  orbital_period: string;   // The number of standard days it takes for this planet to complete a single orbit of its local star.
  gravity: string;          // A number denoting the gravity of this planet, where "1" is normal or 1 standard G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs.
  population: string;       // The average population of sentient beings inhabiting this planet.
  climate: string;          // The climate of this planet. Comma separated if diverse.
  terrain: string;          // The terrain of this planet. Comma separated if diverse.
  surface_water: string;    // The percentage of the planet surface that is naturally occurring water or bodies of water.
  residents: string[];      // An array of People URL Resources that live on this planet.
  films: string[];          // An array of Film URL Resources that this planet has appeared in.
}

export interface SpeciesResource extends ResourceMeta {
  name: string;             // The name of this species.
  classification: string;   // The classification of this species, such as "mammal" or "reptile".
  designation: string;      // The designation of this species, such as "sentient".
  average_height: string;   // The average height of this species in centimeters.
  average_lifespan: string; // The average lifespan of this species in years.
  eye_colors: string;       // A comma-separated string of common eye colors for this species, "none" if this species does not typically have eyes.
  hair_colors: string;      // A comma-separated string of common hair colors for this species, "none" if this species does not typically have hair.
  skin_colors: string;      // A comma-separated string of common skin colors for this species, "none" if this species does not typically have skin.
  language: string;         // The language commonly spoken by this species.
  homeworld: string;        // The URL of a planet resource, a planet that this species originates from.
  people: string[];         // An array of People URL Resources that are a part of this species.
  films: string[];          // An array of Film URL Resources that this species has appeared in.
}

export interface StarshipResource extends ResourceMeta {
  name: string;                   // The name of this starship. The common name, such as "Death Star".
  model: string;                  // The model or official name of this starship. Such as "T-65 X-wing" or "DS-1 Orbital Battle Station".
  starship_class: string;         // The class of this starship, such as "Starfighter" or "Deep Space Mobile Battlestation"
  manufacturer: string;           // The manufacturer of this starship. Comma separated if more than one.
  cost_in_credits: string;        // The cost of this starship new, in galactic credits.
  length: string;                 // The length of this starship in meters.
  crew: string;                   // The number of personnel needed to run or pilot this starship.
  passengers: string;             // The number of non-essential people this starship can transport.
  max_atmosphering_speed: string; // The maximum speed of this starship in the atmosphere. "N/A" if this starship is incapable of atmospheric flight.
  hyperdrive_rating: string;      // The class of this starships hyperdrive.
  MGLT: string;                   // The Maximum number of Megalights this starship can travel in a standard hour. A "Megalight" is a standard unit of distance and has never been defined before within the Star Wars universe. This figure is only really useful for measuring the difference in speed of starships. We can assume it is similar to AU, the distance between our Sun (Sol) and Earth.
  cargo_capacity: string;         // The maximum number of kilograms that this starship can transport.
  consumables: string;            // The maximum length of time that this starship can provide consumables for its entire crew without having to resupply.
  films: string[];                // An array of Film URL Resources that this starship has appeared in.
  pilots: string[];               // An array of People URL Resources that this starship has been piloted by.
}

export interface VehicleResource extends ResourceMeta {
  name: string;                   // The name of this vehicle. The common name, such as "Sand Crawler" or "Speeder bike".
  model: string;                  // The model or official name of this vehicle. Such as "All-Terrain Attack Transport".
  vehicle_class: string;          // The class of this vehicle, such as "Wheeled" or "Repulsorcraft".
  manufacturer: string;           // The manufacturer of this vehicle. Comma separated if more than one.
  length: string;                 // The length of this vehicle in meters.
  cost_in_credits: string;        // The cost of this vehicle new, in Galactic Credits.
  crew: string;                   // The number of personnel needed to run or pilot this vehicle.
  passengers: string;             // The number of non-essential people this vehicle can transport.
  max_atmosphering_speed: string; // The maximum speed of this vehicle in the atmosphere.
  cargo_capacity: string;         // The maximum number of kilograms that this vehicle can transport.
  consumables: string;            // The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply.
  films: string[];                // An array of Film URL Resources that this vehicle has appeared in.
  pilots: string[];               // An array of People URL Resources that this vehicle has been piloted by.
}
