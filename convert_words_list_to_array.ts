#!/usr/bin/env bun

import { readFileSync, writeFileSync } from 'fs';

// Define the type for our word objects
interface WordEntry {
  word: string;
  word_type: string;
}

// Read the word list file
const wordListContent: string = readFileSync('./english/C1_words.md', 'utf-8');

// Split into lines and process each line
const lines: string[] = wordListContent.trim().split('\n');
const wordsArray: WordEntry[] = [];

// Common word types that can be compound
const wordTypes = [
  'auxiliary verb', 'modal verb', 'linking verb', 'per cent'
];

for (const line of lines) {
  // Skip empty lines
  if (!line.trim()) continue;

  const parts: string[] = line.trim().split(' ');
  if (parts.length >= 2) {
    const word: string = parts[0];
    const wordType: string = parts.slice(1).join(' ');
    wordsArray.push({
      word: word,
      word_type: wordType
    });
  }
}

// Convert to JSON and write to a new file
const jsonOutput: string = JSON.stringify(wordsArray, null, 2);
writeFileSync('english/C1_words_array.json', jsonOutput);

console.log(`Successfully converted ${wordsArray.length} words to JSON format.`);
console.log('Output saved to: english/B2_words_array.json'); 