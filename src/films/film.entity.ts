import { PersonEntity } from 'src/people/person.entity';
import { PlanetEntity } from 'src/planets/planet.entity';
import { SpeciesEntity } from 'src/species/species.entity';
import { StarshipEntity } from 'src/starships/starship.entity';
import { VehicleEntity } from 'src/vehicles/vehicle.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class FilmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  episodeID: number;

  @Column()
  openingCrawl: string;

  @Column()
  director: string;

  @Column()
  producer: string;

  @Column()
  releaseDate: string;

  @OneToMany(type => SpeciesEntity, species => species.id)
  species: SpeciesEntity[];

  @OneToMany(type => StarshipEntity, starship => starship.id)
  starships: StarshipEntity[];

  @OneToMany(type => VehicleEntity, vehicle => vehicle.id)
  vehicles: VehicleEntity[];

  @OneToMany(type => PersonEntity, person => person.id)
  characters: PersonEntity[];

  @OneToMany(type => PlanetEntity, planet => planet.id)
  planets: PlanetEntity[];
}
