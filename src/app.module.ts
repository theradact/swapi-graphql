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

const milisInAnHour = 1000 * 3600;

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      socket: {
        host: 'localhost',
        port: 6379,
      },
      isGlobal: true,
      ttl: milisInAnHour * 24,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'swgraphql',
      username: 'swgraphql',
      password: 'swgraphql',
      autoLoadEntities: true,
      synchronize: true,
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
  providers: [],
})
export class AppModule { }
