import { Film } from 'src/resources/films/film.entity';
import { Planet } from 'src/resources/planets/planet.entity';
import { Species } from 'src/resources/species/species.entity';
import { Starship } from 'src/resources/starships/starship.entity';
import { Vehicle } from 'src/resources/vehicles/vehicle.entity';
import { Column, Entity , JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Character {
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

  @ManyToOne(() => Planet, planet => planet.residents)
  homeworld: Planet;

  @ManyToMany(() => Film, film => film.characters)
  films: Film[];

  @ManyToMany(() => Species, species => species.characters)
  @JoinTable({name: 'character_species'})
  species: Species[];

  @ManyToMany(() => Starship, starship => starship.pilots)
  @JoinTable({name: 'character_starships'})
  starships: Starship[];

  @ManyToMany(() => Vehicle, vehicle => vehicle.pilots)
  @JoinTable({name: 'character_vehicles'})
  vehicles: Vehicle[];
}
