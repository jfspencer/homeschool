#!/usr/bin/env bun

interface WordEntry {
  word: string;
  word_type: string;
}

const file1 = { path: 'english/B2_words_array.json', name: 'B2' };
const file2 = { path: 'english/C1_words_array.json', name: 'C1' };

async function findDuplicates() {
  try {
    // Load both word lists
    const file1Words: WordEntry[] = await Bun.file(file1.path).json();
    const file2Words: WordEntry[] = await Bun.file(file2.path).json();

    console.log(`${file1.name} words count: ${file1Words.length}`);
    console.log(`${file2.name} words count: ${file2Words.length}`);

    // Create sets of words for efficient lookup
    const a1WordSet = new Set(file1Words.map(entry => entry.word));
    const a2WordSet = new Set(file2Words.map(entry => entry.word));

    // Find duplicates (words that appear in both lists)
    const duplicates: string[] = [];

    for (const word of a1WordSet) {
      if (a2WordSet.has(word)) {
        duplicates.push(word);
      }
    }

    // Sort duplicates alphabetically
    duplicates.sort();

    console.log(`\nFound ${duplicates.length} duplicate words between ${file1.name} and ${file2.name}:`);
    console.log('='.repeat(50));

    // Display duplicates with their word types from both lists
    for (const duplicateWord of duplicates) {
      const a1Entries = file1Words.filter(entry => entry.word === duplicateWord);
      const a2Entries = file2Words.filter(entry => entry.word === duplicateWord);

      console.log(`\nWord: "${duplicateWord}"`);
      console.log(`  ${file1.name} types: ${a1Entries.map(entry => entry.word_type).join(', ')}`);
      console.log(`  ${file2.name} types: ${a2Entries.map(entry => entry.word_type).join(', ')}`);
    }

    // Summary statistics
    console.log('\n' + '='.repeat(50));
    console.log(`Summary:`);
    console.log(`- Total ${file1.name} words: ${file1Words.length}`);
    console.log(`- Total ${file2.name} words: ${file2Words.length}`);
    console.log(`- Duplicate words: ${duplicates.length}`);
    console.log(`- Unique ${file1.name} words: ${file1Words.length - duplicates.length}`);
    console.log(`- Unique ${file2.name} words: ${file2Words.length - duplicates.length}`);

    // Save duplicates to a file
    const duplicatesData = {
      summary: {
        totalFile1Words: file1Words.length,
        totalFile2Words: file2Words.length,
        duplicateCount: duplicates.length,
        uniqueFile1Words: file1Words.length - duplicates.length,
        uniqueFile2Words: file2Words.length - duplicates.length
      },
      duplicates: duplicates.map(word => {
        const file1Entries = file1Words.filter(entry => entry.word === word);
        const file2Entries = file2Words.filter(entry => entry.word === word);
        return {
          word,
          file1_types: file1Entries.map(entry => entry.word_type),
          file2_types: file2Entries.map(entry => entry.word_type)
        };
      })
    };

    // await Bun.write('duplicates_output.json', JSON.stringify(duplicatesData, null, 2));
    console.log(`\nDetailed results saved to: duplicates_output.json`);

  } catch (error) {
    console.error('Error processing word lists:', error);
  }
}

// Run the script
findDuplicates(); 