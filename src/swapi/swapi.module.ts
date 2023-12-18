import { Module } from '@nestjs/common';
import { SwapiService } from './swapi.service';
import { SwapiController } from './swapi.controller';

@Module({
  controllers: [SwapiController],
  providers: [SwapiService],
})
export class SwapiModule {}
