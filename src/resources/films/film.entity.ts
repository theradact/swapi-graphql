import { Character } from 'src/resources/characters/character.entity';
import { Planet } from 'src/resources/planets/planet.entity';
import { Species } from 'src/resources/species/species.entity';
import { Starship } from 'src/resources/starships/starship.entity';
import { Vehicle } from 'src/resources/vehicles/vehicle.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Film {
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

  @ManyToMany(() => Species, species => species.films)
  @JoinTable({ name: 'film_species' })
  species: Species[];

  @ManyToMany(() => Starship, starship => starship.films)
  @JoinTable({ name: 'film_starships' })
  starships: Starship[];

  @ManyToMany(() => Vehicle, vehicle => vehicle.films)
  @JoinTable({ name: 'film_vehicles' })
  vehicles: Vehicle[];

  @ManyToMany(() => Character, character => character.films)
  @JoinTable({ name: 'film_characters' })
  characters: Character[];

  @ManyToMany(() => Planet, planet => planet.films)
  @JoinTable({ name: 'film_planets' })
  planets: Planet[];
}
