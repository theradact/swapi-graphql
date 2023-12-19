import { Module } from '@nestjs/common';
import { SwapiModule } from './swapi/swapi.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TempResolver } from './temp.resolver';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

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
    SwapiModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
    }),
  ],
  providers: [TempResolver],
})
export class AppModule { }
