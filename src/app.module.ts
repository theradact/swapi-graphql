import { Module } from '@nestjs/common';
import { SwapiModule } from './swapi/swapi.module';

@Module({
  imports: [SwapiModule]
})
export class AppModule {}
