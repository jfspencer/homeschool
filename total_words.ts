import * as fs from 'fs';
import * as path from 'path';

interface WordEntry {
  word: string;
  word_type: string;
}

function sumJsonArrayLengths(): void {
  const englishDir = path.join(__dirname, 'english');

  try {
    // Check if the english directory exists
    if (!fs.existsSync(englishDir)) {
      console.error('English directory not found:', englishDir);
      return;
    }

    // Read all files in the english directory
    const files = fs.readdirSync(englishDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    if (jsonFiles.length === 0) {
      console.log('No JSON files found in the english directory');
      return;
    }

    let totalWords = 0;
    const fileStats: { [filename: string]: number } = {};

    // Process each JSON file
    for (const filename of jsonFiles) {
      const filePath = path.join(englishDir, filename);

      try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const wordArray: WordEntry[] = JSON.parse(fileContent);

        if (Array.isArray(wordArray)) {
          const wordCount = wordArray.length;
          fileStats[filename] = wordCount;
          totalWords += wordCount;

          console.log(`${filename}: ${wordCount} words`);
        } else {
          console.warn(`${filename}: Not a valid array`);
        }
      } catch (error) {
        console.error(`Error processing ${filename}:`, error);
      }
    }

    console.log('\n--- Summary ---');
    console.log(`Total files processed: ${jsonFiles.length}`);
    console.log(`Total words across all files: ${totalWords}`);

    // Show breakdown by file
    console.log('\nBreakdown by file:');
    Object.entries(fileStats)
      .sort(([, a], [, b]) => b - a) // Sort by word count descending
      .forEach(([filename, count]) => {
        console.log(`  ${filename}: ${count} words`);
      });

  } catch (error) {
    console.error('Error reading directory:', error);
  }
}

// Run the script
sumJsonArrayLengths();
