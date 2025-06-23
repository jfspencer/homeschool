#!/usr/bin/env bun

interface WordEntry {
  word: string;
  word_type: string;
}

async function findDuplicates() {
  try {
    // Load both word lists
    const a1Words: WordEntry[] = await Bun.file('english/A1_words_oxford_array.json').json();
    const a2Words: WordEntry[] = await Bun.file('english/A2_words_oxford_array.json').json();

    console.log(`A1 words count: ${a1Words.length}`);
    console.log(`A2 words count: ${a2Words.length}`);

    // Create sets of words for efficient lookup
    const a1WordSet = new Set(a1Words.map(entry => entry.word));
    const a2WordSet = new Set(a2Words.map(entry => entry.word));

    // Find duplicates (words that appear in both lists)
    const duplicates: string[] = [];

    for (const word of a1WordSet) {
      if (a2WordSet.has(word)) {
        duplicates.push(word);
      }
    }

    // Sort duplicates alphabetically
    duplicates.sort();

    console.log(`\nFound ${duplicates.length} duplicate words between A1 and A2:`);
    console.log('='.repeat(50));

    // Display duplicates with their word types from both lists
    for (const duplicateWord of duplicates) {
      const a1Entries = a1Words.filter(entry => entry.word === duplicateWord);
      const a2Entries = a2Words.filter(entry => entry.word === duplicateWord);

      console.log(`\nWord: "${duplicateWord}"`);
      console.log(`  A1 types: ${a1Entries.map(entry => entry.word_type).join(', ')}`);
      console.log(`  A2 types: ${a2Entries.map(entry => entry.word_type).join(', ')}`);
    }

    // Summary statistics
    console.log('\n' + '='.repeat(50));
    console.log(`Summary:`);
    console.log(`- Total A1 words: ${a1Words.length}`);
    console.log(`- Total A2 words: ${a2Words.length}`);
    console.log(`- Duplicate words: ${duplicates.length}`);
    console.log(`- Unique A1 words: ${a1Words.length - duplicates.length}`);
    console.log(`- Unique A2 words: ${a2Words.length - duplicates.length}`);

    // Save duplicates to a file
    const duplicatesData = {
      summary: {
        totalA1Words: a1Words.length,
        totalA2Words: a2Words.length,
        duplicateCount: duplicates.length,
        uniqueA1Words: a1Words.length - duplicates.length,
        uniqueA2Words: a2Words.length - duplicates.length
      },
      duplicates: duplicates.map(word => {
        const a1Entries = a1Words.filter(entry => entry.word === word);
        const a2Entries = a2Words.filter(entry => entry.word === word);
        return {
          word,
          a1_types: a1Entries.map(entry => entry.word_type),
          a2_types: a2Entries.map(entry => entry.word_type)
        };
      })
    };

    await Bun.write('duplicates_output.json', JSON.stringify(duplicatesData, null, 2));
    console.log(`\nDetailed results saved to: duplicates_output.json`);

  } catch (error) {
    console.error('Error processing word lists:', error);
  }
}

// Run the script
findDuplicates(); 