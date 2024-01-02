import { Module } from '@nestjs/common';
import { UniqueWordsResolver } from './unique-words.resolver';
import { CharactersModule } from '../resources/characters/characters.module';
import { FilmsModule } from '../resources/films/films.module';
import { PrevalentCharacterResolver } from './prevalent-character.resolver';

@Module({
  imports: [CharactersModule, FilmsModule],
  providers: [UniqueWordsResolver, PrevalentCharacterResolver]
})
export class QueriesModule {}
