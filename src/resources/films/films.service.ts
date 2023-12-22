import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { Film } from "./film.entity";
import { SwapiService } from "src/swapi/swapi.service";
import { FilmResourceDto } from "src/swapi/types";
import { SpeciesService } from "src/resources/species/species.service";
import { StarshipsService } from "src/resources/starships/starships.service";
import { VehiclesService } from "src/resources/vehicles/vehicles.service";
import { CharactersService } from "src/resources/characters/characters.service";
import { PlanetsService } from "src/resources/planets/planets.service";

@Injectable()
export class FilmsService {
  public constructor(
    @InjectRepository(Film) private readonly filmRepository: Repository<Film>,
    private readonly speciesService: SpeciesService,
    private readonly starshipsService: StarshipsService,
    private readonly vehiclesService: VehiclesService,
    private readonly charactersService: CharactersService,
    private readonly planetsService: PlanetsService,
    private readonly swapiService: SwapiService
  ) { }

  private async create(film: FilmResourceDto) {
    const newFilm = this.filmRepository.create({
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

  public async findAll(options?: FindManyOptions<Film>) {
    return this.filmRepository.find();
  }

  public async findByID(id: string) {
    return this.filmRepository.findOne({ where: { id } });
  }

  public async populate() {
    const allSWAPIFilms = await this.swapiService.getAll('films');

    const allFilms = await Promise.all(allSWAPIFilms.map(this.create, this));

    await this.filmRepository.clear();
    await this.filmRepository.save(allFilms);
  }
}
