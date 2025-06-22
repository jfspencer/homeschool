#!/usr/bin/env bun

import { readFileSync, writeFileSync } from 'fs';

// Define the type for our word objects
interface WordEntry {
  word: string;
  word_type: string;
}

// Read the word list file
const wordListContent: string = readFileSync('./english/A2_words_oxford.json', 'utf-8');

// Split into lines and process each line
const lines: string[] = wordListContent.trim().split('\n');
const wordsArray: WordEntry[] = [];

for (const line of lines) {
  // Skip empty lines
  if (!line.trim()) continue;

  // Split the line by spaces to separate word from type(s)
  const parts: string[] = line.trim().split(' ');

  if (parts.length >= 2) {
    const word: string = parts[0];
    const wordType: string = parts.slice(1).join(' '); // Join remaining parts as word type

    wordsArray.push({
      word: word,
      word_type: wordType
    });
  }
}

// Convert to JSON and write to a new file
const jsonOutput: string = JSON.stringify(wordsArray, null, 2);
writeFileSync('english/A2_words_oxford_converted.json', jsonOutput);

console.log(`Successfully converted ${wordsArray.length} words to JSON format.`);
console.log('Output saved to: english/A2_words_oxford_converted.json');

// Also update the original file with proper JSON format
writeFileSync('english/A2_words_oxford.json', jsonOutput);
console.log('Original file updated with proper JSON format.'); 