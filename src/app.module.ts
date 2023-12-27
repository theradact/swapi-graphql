import { Module } from '@nestjs/common';
import { SwapiModule } from './swapi/swapi.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { FilmsModule } from './resources/films/films.module';
import { CharactersModule } from './resources/characters/characters.module';
import { PlanetsModule } from './resources/planets/planets.module';
import { SpeciesModule } from './resources/species/species.module';
import { StarshipsModule } from './resources/starships/starships.module';
import { VehiclesModule } from './resources/vehicles/vehicles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PopulateService } from './populate/populate.service';
import 'dotenv/config';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      socket: {
        host: 'host.docker.internal',
        port: 6379,
      },
      isGlobal: true,
      ttl: 1000 * 3600 * parseFloat(process.env.CACHE_HOURS),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'host.docker.internal',
      port: parseInt(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: process.env.SCRIPT === 'populate',
      logging: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
    }),
    SwapiModule,
    FilmsModule,
    CharactersModule,
    PlanetsModule,
    SpeciesModule,
    StarshipsModule,
    VehiclesModule,
  ],
  providers: [PopulateService],
})
export class AppModule { }
