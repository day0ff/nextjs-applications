import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const rawDataFile = join(__dirname, '../db/raw-schools-data.json');
const processedDataFile = join(__dirname, '../db/processed-schools-data.json');

const rawAdapter = new JSONFile(rawDataFile);
const processedAdapter = new JSONFile(processedDataFile);

const rawDB = new Low(rawAdapter);
const processedDB = new Low(processedAdapter);
await rawDB.read();

const { values } = rawDB.data || {};
const schools = values.map(([position, name, address, ratingString]) => {
    const rating = Number(ratingString.replace(',', '.'))
    return ({position, name, address, rating})
});

await processedDB.read();
processedDB.data = {schools};
processedDB.write();