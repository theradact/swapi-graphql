import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { Planet } from './planet.entity';
import { PlanetDTO } from './planet.dto';
import { PlanetsService } from './planets.service';
import { SwapiModule } from '../../swapi/swapi.module';

@Module({
  imports: [
    SwapiModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Planet])],
      resolvers: [
        {
          EntityClass: Planet,
          DTOClass: PlanetDTO,
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
  providers: [PlanetsService],
  exports: [PlanetsService],
})
export class PlanetsModule { }
