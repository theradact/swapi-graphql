import { Film } from '../films/film.entity';
import { Planet } from '../planets/planet.entity';
import { ResourceEntityBase } from '../resource-entity-base.interface';
import { Species } from '../species/species.entity';
import { Starship } from '../starships/starship.entity';
import { Vehicle } from '../vehicles/vehicle.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Character implements ResourceEntityBase {
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

  @ManyToOne(() => Planet, planet => planet.residents, { onDelete: 'CASCADE' })
  homeworld: Planet;

  @ManyToMany(() => Film, film => film.characters, { onDelete: 'CASCADE' })
  films: Film[];

  @ManyToMany(() => Species, species => species.characters, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'character_species' })
  species: Species[];

  @ManyToMany(() => Starship, starship => starship.pilots, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'character_starships' })
  starships: Starship[];

  @ManyToMany(() => Vehicle, vehicle => vehicle.pilots, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'character_vehicles' })
  vehicles: Vehicle[];
}
