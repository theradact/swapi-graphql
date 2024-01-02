import { countOccurences, extractWords, removeLineBreaks } from "./string.utils";

describe('String Util Functions', () => {
  describe('removeLineBreaks', () => {
    it('removes line breaks from a string with newline characters', () => {
      const input = 'Hello\nWorld';
      const result = removeLineBreaks(input);
      expect(result).toBe('Hello World');
    });

    it('removes line breaks from a string with carriage return characters', () => {
      const input = 'Hello\rWorld';
      const result = removeLineBreaks(input);
      expect(result).toBe('Hello World');
    });

    it('removes line breaks from a string with both newline and carriage return characters', () => {
      const input = 'Hello\n\rWorld';
      const result = removeLineBreaks(input);
      expect(result).toBe('Hello World');
    });

    it('returns the input string unchanged if it has no line breaks', () => {
      const input = 'Hello World';
      const result = removeLineBreaks(input);
      expect(result).toBe('Hello World');
    });

    it('handles empty string input', () => {
      const input = '';
      const result = removeLineBreaks(input);
      expect(result).toBe('');
    });

    it('handles input with multiple consecutive line breaks', () => {
      const input = 'Hello\n\n\nWorld';
      const result = removeLineBreaks(input);
      expect(result).toBe('Hello World');
    });
  });



  describe('countOccurences', () => {
    it('returns 0 when search phrase is not found in the target string', () => {
      const search = 'apple';
      const target = 'banana orange';
      const result = countOccurences(search, target);
      expect(result).toBe(0);
    });

    it('returns correct count when search phrase is found in the target string', () => {
      const search = 'apple';
      const target = 'apple orange apple';
      const result = countOccurences(search, target);
      expect(result).toBe(2);
    });

    it('search is case-insensitive', () => {
      const search = 'apple';
      const target = 'Apple Orange aPpLe';
      const result = countOccurences(search, target);
      expect(result).toBe(2);
    });

    it('handles special characters in the search phrase', () => {
      const search = '^$.*+?()[]{}\\|';
      const target = '^$.*+?()[]{}\\| ^$.*+?()[]{}\\|';
      const result = countOccurences(search, target);
      expect(result).toBe(2);
    });

    it('returns 0 for empty search phrase', () => {
      const search = '';
      const target = 'Lorem ipsum dolor sit amet';
      const result = countOccurences(search, target);
      expect(result).toBe(0);
    });

    it('returns 0 for empty target string', () => {
      const search = 'apple';
      const target = '';
      const result = countOccurences(search, target);
      expect(result).toBe(0);
    });

    it('returns 0 for empty search phrase and empty target string', () => {
      const search = '';
      const target = '';
      const result = countOccurences(search, target);
      expect(result).toBe(0);
    });
  });



  describe('extractWords', () => {
    it('returns an array of words from a string', () => {
      const input = 'Hello world, how are you?';
      const result = extractWords(input);
      expect(result).toEqual(['hello', 'world', 'how', 'are', 'you']);
    });
  
    it('contains duplicates if words are repeated in the input string', () => {
      const input = 'The cat in the hat, the hat on the cat.';
      const result = extractWords(input);
      expect(result).toEqual(['the', 'cat', 'in', 'the', 'hat', 'the', 'hat', 'on', 'the', 'cat']);
    });
  
    it('handles words with apostrophes', () => {
      const input = "It's a beautiful day. Don't you think?";
      const result = extractWords(input);
      expect(result).toEqual(expect.arrayContaining(["it's", "don't"]));
    });
  
    it('handles empty input string', () => {
      const input = '';
      const result = extractWords(input);
      expect(result).toEqual([]);
    });
  
    it('handles input with multiple consecutive spaces', () => {
      const input = '   This     is    a  it   ';
      const result = extractWords(input);
      expect(result).toEqual(['this', 'is', 'a', 'it']);
    });
  
    it('converts words to lowercase', () => {
      const input = 'Hello World';
      const result = extractWords(input);
      expect(result).toEqual(['hello', 'world']);
    });
  });
});
