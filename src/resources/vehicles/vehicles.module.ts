import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { Vehicle } from './vehicle.entity';
import { VehicleDTO } from './vehicle.dto';
import { VehiclesService } from './vehicles.service';
import { SwapiModule } from '../../swapi/swapi.module';

@Module({
  imports: [
    SwapiModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([Vehicle])],
      resolvers: [
        {
          EntityClass: Vehicle,
          DTOClass: VehicleDTO,
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
  providers: [VehiclesService],
  exports: [VehiclesService],
})
export class VehiclesModule { }
