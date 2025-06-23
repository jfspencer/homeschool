#!/usr/bin/env bun

interface WordEntry {
  word: string;
  word_type: string;
}

async function findDuplicateWords(): Promise<void> {
  try {
    // Read the JSON file
    const filePath = './english/A2_words_oxford_array.json';
    const fileContent = await Bun.file(filePath).text();
    const words: WordEntry[] = JSON.parse(fileContent);

    // Create a map to count word occurrences
    const wordCount = new Map<string, number>();

    // Count each word
    for (const entry of words) {
      const word = entry.word.toLowerCase(); // Normalize to lowercase
      wordCount.set(word, (wordCount.get(word) || 0) + 1);
    }

    // Find words that occur more than once
    const duplicates = new Map<string, number>();
    for (const [word, count] of wordCount.entries()) {
      if (count > 1) {
        duplicates.set(word, count);
      }
    }

    // Display results
    if (duplicates.size === 0) {
      console.log('No duplicate words found.');
    } else {
      console.log(`Found ${duplicates.size} words that occur more than once:\n`);

      // Sort by count (descending) then by word (ascending)
      const sortedDuplicates = Array.from(duplicates.entries())
        .sort((a, b) => {
          if (b[1] !== a[1]) {
            return b[1] - a[1]; // Sort by count descending
          }
          return a[0].localeCompare(b[0]); // Sort by word ascending
        });

      for (const [word, count] of sortedDuplicates) {
        console.log(`${word}: ${count} times`);
      }
    }

  } catch (error) {
    console.error('Error reading or processing the file:', error);
    process.exit(1);
  }
}

// Run the script
findDuplicateWords(); 