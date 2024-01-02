import { Field, Int, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { FilmsService } from '../resources/films/films.service';
import { CharactersService } from '../resources/characters/characters.service';
import { CharacterDTO } from '../resources/characters/character.dto';
import { countOccurences, removeLineBreaks } from '../utils/string.utils';

/**
 * This DTO is only ever going to be used in this file
 * I like to keep this types of objects in the same file
 */
@ObjectType('PrevalentCharacters', {
  description: `Characters that appears the most often across all of the openings of the film`
})
export class PrevalentCharactersDTO {
  @Field(type => [CharacterDTO])
  characters: CharacterDTO[];

  @Field(type => Int, { description: `A number of times this character occured in all of the film openings.` })
  occurences: number;
}

@Resolver(of => PrevalentCharactersDTO)
export class PrevalentCharacterResolver {
  constructor(
    private readonly filmsService: FilmsService,
    private readonly charactersService: CharactersService,
  ) { }

  /**
   * Creates a map of names with the count
   * of how many times the name appeared in all of the texts
   * 
   * @param names array of names to look for
   * @param texts array of texts to look for the names in
   * @returns Map of names with their corresponding count
   */
  private createNameOccurencesMap(names: string[], texts: string[]) {
    const occurences = new Map<string, number>();

    names.forEach(name => {
      texts.forEach(text => {
        const additional = countOccurences(name, text);

        if (occurences.has(name)) {
          const current = occurences.get(name);
          occurences.set(name, current + additional);
        } else {
          occurences.set(name, additional);
        }
      });
    });

    return occurences;
  }

  @Query(returns => PrevalentCharactersDTO, {
    description: `Characters that appears the most often across all of the openings of the film`
  })
  async getFilmOpeningsPrevalentCharacter() {
    const [
      films,
      characters
    ] = await Promise.all([
      this.filmsService.findAll(),
      this.charactersService.findAll()
    ])
    
    const cleanFilmOpenings = films.map(film => removeLineBreaks(film.openingCrawl));
    const characterNames = characters.map(character => character.name);

    const nameOccurences = this.createNameOccurencesMap(characterNames, cleanFilmOpenings);

    const maxOccurences = Math.max(...nameOccurences.values());

    const maxOccurencesCharacters = characters.filter(character => {
      return nameOccurences.get(character.name) === maxOccurences;
    });

    const prevalentCharacters = new PrevalentCharactersDTO();
    prevalentCharacters.characters = maxOccurencesCharacters;
    prevalentCharacters.occurences = maxOccurences;

    return prevalentCharacters;
  }
}
