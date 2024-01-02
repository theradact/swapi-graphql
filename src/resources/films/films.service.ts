import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Film } from "./film.entity";
import { SwapiService } from "../../swapi/swapi.service";
import { CharactersService } from "../characters/characters.service";
import { PlanetsService } from "../planets/planets.service";
import { SpeciesService } from "../species/species.service";
import { StarshipsService } from "../starships/starships.service";
import { VehiclesService } from "../vehicles/vehicles.service";
import { ResourceService } from "../resource.service";
import { FilmResourceDTO } from "../../swapi/types";

@Injectable()
export class FilmsService extends ResourceService<Film> {
  public constructor(
    @InjectRepository(Film) protected readonly repository: Repository<Film>,
    protected readonly swapiService: SwapiService,
    protected readonly speciesService: SpeciesService,
    protected readonly starshipsService: StarshipsService,
    protected readonly vehiclesService: VehiclesService,
    protected readonly charactersService: CharactersService,
    protected readonly planetsService: PlanetsService,
  ) {
    super('films', repository, swapiService);
  }

  protected async create(film: FilmResourceDTO) {
    const newFilm = this.repository.create({
      id: film.url,
      title: film.title,
      episodeID: film.episode_id,
      openingCrawl: film.opening_crawl,
      director: film.director,
      producer: film.producer,
      releaseDate: film.release_date,
    });

    [
      newFilm.species,
      newFilm.starships,
      newFilm.vehicles,
      newFilm.characters,
      newFilm.planets,
    ] = await Promise.all([
      Promise.all(film.species.map(speciesID => this.speciesService.findByID(speciesID))),
      Promise.all(film.starships.map(starshipID => this.starshipsService.findByID(starshipID))),
      Promise.all(film.vehicles.map(vehicleID => this.vehiclesService.findByID(vehicleID))),
      Promise.all(film.characters.map(characterID => this.charactersService.findByID(characterID))),
      Promise.all(film.planets.map(planetID => this.planetsService.findByID(planetID)))
    ]);

    return newFilm;
  }
}
