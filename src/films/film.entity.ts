import { PersonEntity } from 'src/people/person.entity';
import { PlanetEntity } from 'src/planets/planet.entity';
import { SpeciesEntity } from 'src/species/species.entity';
import { StarshipEntity } from 'src/starships/starship.entity';
import { VehicleEntity } from 'src/vehicles/vehicle.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

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

  @ManyToMany(type => SpeciesEntity, species => species.films)
  @JoinTable()
  species: SpeciesEntity[];

  @ManyToMany(type => StarshipEntity, starship => starship.films)
  @JoinTable()
  starships: StarshipEntity[];

  @ManyToMany(type => VehicleEntity, vehicle => vehicle.films)
  @JoinTable()
  vehicles: VehicleEntity[];

  @ManyToMany(type => PersonEntity, person => person.films)
  @JoinTable()
  characters: PersonEntity[];

  @ManyToMany(type => PlanetEntity, planet => planet.films)
  @JoinTable()
  planets: PlanetEntity[];
}
