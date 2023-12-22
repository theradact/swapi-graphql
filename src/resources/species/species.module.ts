import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { Species } from './species.entity';
import { SpeciesDTO } from './species.dto';
import { SpeciesService } from './species.service';
import { SwapiModule } from '../../swapi/swapi.module';
import { PlanetsModule } from '../planets/planets.module';

@Module({
  imports: [
    SwapiModule,
    PlanetsModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Species])],
      resolvers: [
        {
          EntityClass: Species,
          DTOClass: SpeciesDTO,
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
  providers: [SpeciesService],
  exports: [SpeciesService],
})
export class SpeciesModule {}
