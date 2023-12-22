import { Injectable } from '@nestjs/common';
import { CharactersService } from '../resources/characters/characters.service';
import { FilmsService } from '../resources/films/films.service';
import { PlanetsService } from '../resources/planets/planets.service';
import { SpeciesService } from '../resources/species/species.service';
import { StarshipsService } from '../resources/starships/starships.service';
import { VehiclesService } from '../resources/vehicles/vehicles.service';

export interface PopulateableService {
  readonly name: string;
  populate: () => Promise<void>;
  clear: () => Promise<void>;
}

@Injectable()
export class PopulateService {
  private isLoggingEnabled = true;

  public constructor(
    private readonly charactersService: CharactersService,
    private readonly filmsService: FilmsService,
    private readonly planetsService: PlanetsService,
    private readonly speciesService: SpeciesService,
    private readonly starshipsService: StarshipsService,
    private readonly vehiclesService: VehiclesService,
  ) { }

  private maybeLog(message: string) {
    if (this.isLoggingEnabled) {
      console.log(message);
    }
  }

  private async populateResource(service: PopulateableService) {
    this.maybeLog(`${service.name} started populating`);
    await service.populate();
    this.maybeLog(`${service.name} resource populated successfully.`);
  }

  public async populate() {
    this.maybeLog(`Started clearing the database.`);
    await this.clear();
    this.maybeLog(`Finished clearing the database`);

    this.maybeLog(`Started resources population.`);
    await this.populateResource(this.planetsService);
    await Promise.all([
      this.populateResource(this.speciesService),
      this.populateResource(this.starshipsService),
      this.populateResource(this.vehiclesService),
    ]);
    await this.populateResource(this.charactersService);
    await this.populateResource(this.filmsService);
    this.maybeLog(`All resources have been populated.`);
  }

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
