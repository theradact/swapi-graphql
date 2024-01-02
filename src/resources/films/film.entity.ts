import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { Character } from '../characters/character.entity';
import { Planet } from '../planets/planet.entity';
import { Species } from '../species/species.entity';
import { Starship } from '../starships/starship.entity';
import { Vehicle } from '../vehicles/vehicle.entity';
import { ResourceEntityBase } from '../resource-entity-base.interface';

@Entity()
export class Film implements ResourceEntityBase {
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

  @ManyToMany(() => Species, species => species.films, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'film_species' })
  species: Species[];

  @ManyToMany(() => Starship, starship => starship.films, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'film_starships' })
  starships: Starship[];

  @ManyToMany(() => Vehicle, vehicle => vehicle.films, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'film_vehicles' })
  vehicles: Vehicle[];

  @ManyToMany(() => Character, character => character.films, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'film_characters' })
  characters: Character[];

  @ManyToMany(() => Planet, planet => planet.films, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'film_planets' })
  planets: Planet[];
}
