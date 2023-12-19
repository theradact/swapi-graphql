import { FilmEntity } from 'src/films/film.entity';
import { PlanetEntity } from 'src/planets/planet.entity';
import { SpeciesEntity } from 'src/species/species.entity';
import { StarshipEntity } from 'src/starships/starship.entity';
import { VehicleEntity } from 'src/vehicles/vehicle.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

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

  @ManyToOne(type => PlanetEntity, planet => planet.residents)
  homeworld: PlanetEntity;

  @ManyToMany(type => FilmEntity, film => film.characters)
  films: FilmEntity[];

  @ManyToMany(type => SpeciesEntity, species => species.people)
  @JoinTable()
  species: SpeciesEntity[];

  @ManyToMany(type => StarshipEntity, starship => starship.pilots)
  @JoinTable()
  starships: StarshipEntity[];

  @ManyToMany(type => VehicleEntity, vehicle => vehicle.pilots)
  @JoinTable()
  vehicles: VehicleEntity[];
}
