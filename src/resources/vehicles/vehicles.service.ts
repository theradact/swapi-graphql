import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { SwapiService } from "../../swapi/swapi.service";
import { VehicleResourceDto } from "../../swapi/types";
import { Vehicle } from "./vehicle.entity";

@Injectable()
export class VehiclesService {
  public constructor(
    @InjectRepository(Vehicle) private readonly vehicleRepository: Repository<Vehicle>,
    private readonly swapiService: SwapiService
  ) { }

  private async create(vehicle: VehicleResourceDto) {
    return this.vehicleRepository.create({
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

  public async findAll(options?: FindManyOptions<Vehicle>) {
    return this.vehicleRepository.find();
  }

  public async findByID(id: string) {
    return this.vehicleRepository.findOne({ where: { id } });
  }

  public async populate() {
    const allSWAPIvehicles = await this.swapiService.getAll('vehicles');

    const allvehicles = await Promise.all(allSWAPIvehicles.map(this.create, this));

    await this.vehicleRepository.clear();
    await this.vehicleRepository.save(allvehicles);
  }
}
