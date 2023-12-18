import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SwapiService } from './swapi.service';
import { Resource } from './types';

@Controller('swapi')
export class SwapiController {
  constructor(private readonly swapiService: SwapiService) { }

  @Get(':resource')
  findAll(@Param('resource') resource: Resource, @Query('page') page: string) {
    const result = this.swapiService.findAll(resource);
    return result;
  }

  @Get(':resource/:id')
  findOne(@Param('resource') resource: string, @Param('id') id: string) {
    const result = this.swapiService.findOne(+id);
    return result;
  }
}
