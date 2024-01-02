import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from '../resources/films/films.service';
import { UniqueWordsResolver, UniqueWordDTO } from './unique-words.resolver';

const mockFilmsService = {
  findAll: jest.fn(),
};

describe('UniqueWordsResolver', () => {
  let resolver: UniqueWordsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UniqueWordsResolver,
        { provide: FilmsService, useValue: mockFilmsService },
      ],
    }).compile();

    resolver = module.get<UniqueWordsResolver>(UniqueWordsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createWordCountMap', () => {
    let createWordCountMap: Function;

    beforeEach(() => {
      // @ts-ignore: accessing private property
      createWordCountMap = resolver.createWordCountMap;
    });

    it('should return an empty map for an empty array', () => {
      const words = [];
      const result = createWordCountMap(words);
      expect(result.size).toBe(0);
    });
  
    it('should correctly count occurrences of words in the array', () => {
      const words = ['apple', 'banana', 'apple', 'orange', 'banana'];
      const result = createWordCountMap(words);
      expect(result.get('apple')).toBe(2);
      expect(result.get('banana')).toBe(2);
      expect(result.get('orange')).toBe(1);
    });
  
    it('should handle case sensitivity', () => {
      const words = ['apple', 'Apple', 'ApPlE'];
      const result = createWordCountMap(words);
      expect(result.get('apple')).toBe(3);
    });
  });

  describe('getFilmOpeningsUniqueWords', () => {
    beforeEach(() => {
      const films = [
        { openingCrawl: 'Film one opening' },
        { openingCrawl: 'Film two opening' },
        { openingCrawl: 'Long time ago there was an opening' },
      ];

      mockFilmsService.findAll.mockResolvedValue(films);
    });

    it('should return an array of UniqueWordDTOs', async () => {
      const result = await resolver.getFilmOpeningsUniqueWords();

      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toBeInstanceOf(UniqueWordDTO);
    });

    it('should be sorted in descending order', async () => {
      const result = await resolver.getFilmOpeningsUniqueWords();

      result.forEach((current, index, array) => {
        // if it's first item we can compare with previous
        if (index === 0) return;
        const previous = array[index - 1];

        expect(current.occurences).toBeLessThanOrEqual(previous.occurences);
      })
    });
  });
});
