import { FilmEntity } from 'src/films/film.entity';
import { PlanetEntity } from 'src/planets/planet.entity';
import { SpeciesEntity } from 'src/species/species.entity';
import { StarshipEntity } from 'src/starships/starship.entity';
import { VehicleEntity } from 'src/vehicles/vehicle.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class PersonEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  birthYear: string;

  @Column()
  eyeColor: string;

  @Column()
  gender: string;

  @Column()
  hairColor: string;

  @Column()
  height: string;

  @Column()
  mass: string;

  @Column()
  skinColor: string;

  @ManyToOne(type => PlanetEntity, planet => planet.id)
  homeworld: PlanetEntity;

  @OneToMany(type => FilmEntity, film => film.id)
  films: FilmEntity[];

  @OneToMany(type => SpeciesEntity, species => species.id)
  species: SpeciesEntity[];

  @OneToMany(type => StarshipEntity, starship => starship.id)
  starships: StarshipEntity[];

  @OneToMany(type => VehicleEntity, vehicle => vehicle.id)
  vehicles: VehicleEntity[];
}
