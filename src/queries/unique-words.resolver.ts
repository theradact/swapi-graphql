import { Field, Int, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { FilmsService } from '../resources/films/films.service';
import { extractWords, removeLineBreaks } from '../utils/string.utils';

/**
 * This DTO is only ever going to be used in this file
 * I like to keep this types of objects in the same file
 */
@ObjectType('UniqueWord')
export class UniqueWordDTO {
  @Field({ description: `Unique word from all the film openings.` })
  word: string;

  @Field(type => Int, { description: `A number of times this word occured in all of the film openings.` })
  occurences: number;
}



@Resolver(of => UniqueWordDTO)
export class UniqueWordsResolver {
  constructor(
    private readonly filmsService: FilmsService
  ) { }

  /**
   * Creates a map of unique words with the count
   * of how many times the word appeared in the array
   * 
   * @param words array of words that will be counted
   * @returns Map of words with their corresponding count
   */
  private createWordCountMap(words: string[]) {
    const wordCounts = new Map<string, number>();
    const lowercaseWords = words.map(word => word.toLowerCase());

    lowercaseWords.forEach(word => {
      if (wordCounts.has(word)) {
        const current = wordCounts.get(word);
        wordCounts.set(word, current + 1);
      } else {
        wordCounts.set(word, 1);
      }
    });

    return wordCounts;
  }

  /**
   * Creates DTO's of UniqueWords and sorts them from most to least common
   * 
   * @param wordCounts A map of words with their count
   * @returns Array of UniqueWord entities sorted from most to least common
   */
  private createEntitiesFromCountMap(wordCounts: Map<string, number>) {
    const uniqueWords = Array.from(wordCounts.entries()).map(([word, occurences]) => {
      const uniqueWord = new UniqueWordDTO();
      uniqueWord.word = word;
      uniqueWord.occurences = occurences;
      return uniqueWord;
    });

    uniqueWords.sort((a, b) => b.occurences - a.occurences);

    return uniqueWords;
  }

  @Query(returns => [UniqueWordDTO], {
    description: `In descending order: An array of pairs of unique words from all films openings paired with their number of occurrences in the text.`
  })
  async getFilmOpeningsUniqueWords() {
    const films = await this.filmsService.findAll();

    const cleanFilmOpenings = films.map(film => removeLineBreaks(film.openingCrawl));

    const allOpeningsWords = cleanFilmOpenings.flatMap(filmOpening => {
      return extractWords(filmOpening);
    });

    const wordCounts = this.createWordCountMap(allOpeningsWords);
    const uniqueWords = this.createEntitiesFromCountMap(wordCounts);

    return uniqueWords;
  }
}
