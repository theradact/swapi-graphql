import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { Film } from './film.entity';
import { FilmDTO } from './film.dto';
import { FilmsService } from './films.service';
import { SwapiModule } from '../../swapi/swapi.module';
import { CharactersModule } from '../characters/characters.module';
import { PlanetsModule } from '../planets/planets.module';
import { SpeciesModule } from '../species/species.module';
import { StarshipsModule } from '../starships/starships.module';
import { VehiclesModule } from '../vehicles/vehicles.module';

@Module({
  imports: [
    SwapiModule,
    SpeciesModule,
    StarshipsModule,
    VehiclesModule,
    CharactersModule,
    PlanetsModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Film])],
      resolvers: [
        {
          EntityClass: Film,
          DTOClass: FilmDTO,
          create: {
            disabled: true,
          },
          read: {
            disabled: false,
          },
          update: {
            disabled: true,
          },
          delete: {
            disabled: true,
          }
        },
      ],
    }),
  ],
  providers: [FilmsService],
  exports: [FilmsService],
})
export class FilmsModule {}
