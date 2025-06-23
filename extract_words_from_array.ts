#!/usr/bin/env bun

interface WordEntry {
  word: string;
  word_type: string;
}

async function extractWords(jsonFilePath: string): Promise<void> {
  try {
    // Read and parse the JSON file
    const fileContent = await Bun.file(jsonFilePath).text();
    const data: WordEntry[] = JSON.parse(fileContent);

    // Extract words and sort by length (shortest first)
    const words = data
      .filter(item => item.word)
      .map(item => item.word)
      .sort((a, b) => a.length - b.length);

    // Print each word
    for (const word of words) {
      console.log(word);
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('ENOENT')) {
        console.error(`Error: File '${jsonFilePath}' not found.`);
      } else if (error instanceof SyntaxError) {
        console.error(`Error: Invalid JSON in file '${jsonFilePath}': ${error.message}`);
      } else {
        console.error(`Error: ${error.message}`);
      }
    } else {
      console.error('An unknown error occurred.');
    }
    process.exit(1);
  }
}

// Get the JSON file path from command line arguments or use default
const jsonFile = process.argv[2] || "english/A1_words_oxford_array.json";

// Run the extraction
extractWords(jsonFile); 