import { Injectable } from '@nestjs/common';
import { CharactersService } from '../resources/characters/characters.service';
import { FilmsService } from '../resources/films/films.service';
import { PlanetsService } from '../resources/planets/planets.service';
import { SpeciesService } from '../resources/species/species.service';
import { StarshipsService } from '../resources/starships/starships.service';
import { VehiclesService } from '../resources/vehicles/vehicles.service';
import ProgressBar = require("progress");

@Injectable()
export class PopulateService {
  public constructor(
    private readonly charactersService: CharactersService,
    private readonly filmsService: FilmsService,
    private readonly planetsService: PlanetsService,
    private readonly speciesService: SpeciesService,
    private readonly starshipsService: StarshipsService,
    private readonly vehiclesService: VehiclesService,
  ) { }

  /**
   * Logs a message along with the date and adds formatting
   * @param message text to log
   */
  private log(message: string) {
    const dateString = (new Date()).toLocaleString();
    console.log(`[${dateString}] \x1b[1m\x1b[34m${message}\x1b[0m`);
  }

  /**
   * Synchronizes database with data from StarWars API
   */
  public async populate() {
    this.log(`Started Star Wars API data synchronization.`);

    await this.clear();

    // TODO: Figure this out
    // sadly this does not work with docker-compose up as we would need pseudo tty
    // and with compose all services logs are streamed together 
    const bar = new ProgressBar(`Synchronizing data: [\x1b[32m\x1b[1m:bar\x1b[0m] :percent`, {
      width: 25,
      complete: '■',
      incomplete: ' ',
      total: 6,
    });

    await this.planetsService.populate().then(() => bar.tick());
    await Promise.all([
      this.speciesService.populate().then(() => bar.tick()),
      this.starshipsService.populate().then(() => bar.tick()),
      this.vehiclesService.populate().then(() => bar.tick()),
    ]);
    await this.charactersService.populate().then(() => bar.tick());
    await this.filmsService.populate().then(() => bar.tick());

    this.log(`Data synchronization complete.`);
  }

  /**
   * Removes all resources data
   */
  private async clear() {
    await Promise.all([
      this.planetsService.clear(),
      this.speciesService.clear(),
      this.starshipsService.clear(),
      this.vehiclesService.clear(),
      this.charactersService.clear(),
      this.filmsService.clear(),
    ]);
  }
}
