import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SwapiService } from "../../swapi/swapi.service";
import { Vehicle } from "./vehicle.entity";
import { MappedResource } from "../mapped-resource.abstract";
import { VehicleResourceDTO } from "../../swapi/types";

@Injectable()
export class VehiclesService extends MappedResource<Vehicle> {
  public constructor(
    @InjectRepository(Vehicle) protected readonly repository: Repository<Vehicle>,
    protected readonly swapiService: SwapiService,
  ) {
    super('vehicles', repository, swapiService);
  }

  protected async create(vehicle: VehicleResourceDTO) {
    return this.repository.create({
      id: vehicle.url,
      name: vehicle.name,
      model: vehicle.model,
      vehicleClass: vehicle.vehicle_class,
      manufacturer: vehicle.manufacturer,
      length: vehicle.length,
      costInCredits: vehicle.cost_in_credits,
      crew: vehicle.crew,
      passengers: vehicle.passengers,
      maxAtmospheringSpeed: vehicle.max_atmosphering_speed,
      cargoCapacity: vehicle.cargo_capacity,
      consumables: vehicle.consumables,
    });
  }
}
