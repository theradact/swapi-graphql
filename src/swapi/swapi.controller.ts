import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SwapiService } from './swapi.service';
import { ResourceName } from './types';

@Controller('swapi')
export class SwapiController {
  constructor(private readonly swapiService: SwapiService) { }

  @Get(':resource')
  async findAll(@Param('resource') resource: ResourceName) {
    const result = await this.swapiService.getAll(resource);
    return result;
  }

}
