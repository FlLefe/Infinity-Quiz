import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import handleRequest from '../app/utils/pgUtils.js';

/**
 * Imports banwords from a file and inserts them into the database.
 * @async
 * @function importBanwords
 * @returns {Promise<void>} A promise that resolves when the banwords are imported successfully or rejects with an error.
 */
async function importBanwords() {
  const { executeRequest } = handleRequest;

  // Path to the banword file
  const filePath = '../data/banwords.txt';

  // Create a readline interface to read the file
  const readlineInterface = createInterface({
    input: createReadStream(filePath), // Use the file as input
    crlfDelay: Infinity, // Treat line breaks as separators
  });

  const banwordArray = [];

  // Listen for the 'line' event for each line read
  readlineInterface.on('line', (line) => {
    banwordArray.push(`('${line}')`);
  });

  // Listen for the 'close' event when reading is complete
  readlineInterface.on('close', async () => {
    const placeholders = banwordArray.join(', '); // Create a string containing all banwords separated by commas
    const query = `INSERT INTO "banword" (label) VALUES ${placeholders};`; // Create a SQL query to insert banwords into the database

    try {
      const { result, error } = await executeRequest(query);
      if (error) {
        console.error('Error executing request:', error);
        process.exit(1); // Exit with error status code
      }
      console.log('Data inserted successfully:', result);
      process.exit(0); // Exit with success status code
    } catch (err) {
      console.error('Error executing request:', err);
      process.exit(1); // Exit with error status code
    }
  });
}

importBanwords();
