import { Test, TestingModule } from '@nestjs/testing';
import { CharacterDTO } from '../resources/characters/character.dto';
import { CharactersService } from '../resources/characters/characters.service';
import { FilmsService } from '../resources/films/films.service';
import { PrevalentCharacterResolver, PrevalentCharactersDTO } from './prevalent-character.resolver';

const mockFilmsService = {
  findAll: jest.fn(),
};

const mockCharactersService = {
  findAll: jest.fn(),
};

describe('PrevalentCharacterResolver', () => {
  let resolver: PrevalentCharacterResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrevalentCharacterResolver,
        { provide: FilmsService, useValue: mockFilmsService },
        { provide: CharactersService, useValue: mockCharactersService },
      ],
    }).compile();

    resolver = module.get<PrevalentCharacterResolver>(PrevalentCharacterResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createNameOccurencesMap', () => {
    let createNameOccurencesMap: Function;

    beforeEach(() => {
      // @ts-ignore: accessing private property
      createNameOccurencesMap = resolver.createNameOccurencesMap;
    });

    it('should return an empty map when both names and texts are empty', () => {
      const names = [];
      const texts = [];
      const result = createNameOccurencesMap(names, texts);
      expect(result.size).toBe(0);
    });
  
    it('should return an empty map when names are empty', () => {
      const names = [];
      const texts = ['text1', 'text2'];
      const result = createNameOccurencesMap(names, texts);
      expect(result.size).toBe(0);
    });
  
    it('should return an empty map when texts are empty', () => {
      const names = ['name1', 'name2'];
      const texts = [];
      const result = createNameOccurencesMap(names, texts);
      expect(result.size).toBe(0);
    });
  
    it('should correctly count occurrences of names in texts', () => {
      const names = ['Joe', 'Jhon'];
      const texts = ['Written by Joe.', 'Jhon likes fires.'];
      const result = createNameOccurencesMap(names, texts);

      expect(result.get('Joe')).toBe(1);
      expect(result.get('Jhon')).toBe(1);
    });
  
    it('should correctly accumulate occurrences for repeated names', () => {
      const names = ['Joe', 'Jhon'];
      const texts = ['Written by Joe.', 'Jhon likes fires.', 'Joe and Jhon together.'];
      const result = createNameOccurencesMap(names, texts);
      
      expect(result.get('Joe')).toBe(2);
      expect(result.get('Jhon')).toBe(2);
    });
  
    it('should handle case sensitivity', () => {
      const names = ['Joe'];
      const texts = ['Written by Joe.', 'joe is illiterate.'];
      const result = createNameOccurencesMap(names, texts);
      
      expect(result.get('Joe')).toBe(2);
    });
  });



  describe('getFilmOpeningsPrevalentCharacter', () => {
    beforeEach(() => {
      const films = [
        { openingCrawl: 'Film with Character 1' },
        { openingCrawl: 'Film with Character 1 and Character 2' },
        { openingCrawl: 'Film with Character 3 and Character 2' },
      ];

      const characters: Partial<CharacterDTO>[] = [
        { name: 'Character 1' },
        { name: 'Character 2' },
        { name: 'Character 3' },
      ];

      mockFilmsService.findAll.mockResolvedValue(films);
      mockCharactersService.findAll.mockResolvedValue(characters);
    });

    it('should return PrevalentCharactersDTO', async () => {
      const result = await resolver.getFilmOpeningsPrevalentCharacter();

      expect(result).toBeInstanceOf(PrevalentCharactersDTO);
    });

    it('should return the correct characters with correct count', async () => {
      const result = await resolver.getFilmOpeningsPrevalentCharacter();

      expect(result.characters).toHaveLength(2);
      expect(result.occurences).toBe(2);
    });
  });
});
