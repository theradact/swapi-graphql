import escapeRegExp = require("lodash/escapeRegExp");

/**
 * Removes all line breaks from a string
 * 
 * @param input string to remove linebreaks from
 * @returns the input string without line breaks
 */
export function removeLineBreaks(input: string) {
  return input.replace(/[\r?\n|\r]+/g, " ");
}

/**
 * Returns a number of occurences of the search phrase in the target string
 * 
 * @param search phrase to look for
 * @param target string in which to look for the search phrase
 */
export function countOccurences(search: string, target: string) {
  if (!search || !target) {
    return 0;
  }

  const pattern = new RegExp(escapeRegExp(search), 'gi');

  const matches = target.match(pattern);

  if (matches === null) {
    return 0;
  }

  return matches.length;
}

/**
 * Returns array of all words in a string.
 * Contains duplicates.
 * Couts words with apostrophe like it's or don't as a single word
 * 
 * @param input string to extract the words from
 * @returns array of words in the input string
 */
export function extractWords(input: string) {
  const wordMatches = input.match(/[\w|']+/g);

  if (wordMatches === null) {
    return [];
  }
  
  return wordMatches.map(word => word.toLowerCase());
}
