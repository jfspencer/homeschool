const fs = require('fs');
const path = require('path');

// Define interfaces for type safety
interface WordItem {
  word: string;
  word_type: string;
}

interface WordsObject {
  [key: string]: WordItem;
}

// Read the JSON file
const inputFile = path.join(__dirname, 'english', 'A1_words_Q_Z_oxford.json');
const outputFile = path.join(__dirname, 'english', 'A1_words_Q_Z_oxford_converted.json');

try {
  // Read and parse the JSON file
  const jsonData = fs.readFileSync(inputFile, 'utf8');
  const wordsArray: WordItem[] = JSON.parse(jsonData);

  // Convert array to object with word as key
  const wordsObject: WordsObject = {};

  wordsArray.forEach((item: WordItem) => {
    const word = item.word;
    wordsObject[word] = {
      word: item.word,
      word_type: item.word_type
    };
  });

  // Write the converted object to a new file
  fs.writeFileSync(outputFile, JSON.stringify(wordsObject, null, 2), 'utf8');

  console.log(`Conversion completed successfully!`);
  console.log(`Input: ${wordsArray.length} words`);
  console.log(`Output: ${Object.keys(wordsObject).length} words`);
  console.log(`Output file: ${outputFile}`);

  // Show a few examples of the converted format
  console.log('\nExample conversions:');
  const exampleWords = Object.keys(wordsObject).slice(0, 3);
  exampleWords.forEach(word => {
    console.log(`${word}:`, JSON.stringify(wordsObject[word]));
  });

} catch (error: unknown) {
  console.error('Error:', error instanceof Error ? error.message : String(error));
  process.exit(1);
} 