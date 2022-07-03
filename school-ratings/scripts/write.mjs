import {readFile, writeFile} from 'fs/promises';

const db = await readFile(new URL('../data/db.json', import.meta.url));
const schools = JSON.parse(db).schools.map((school, index) => {
    const rating = Number(school.rating.replace(',', '.'))
    return ({...school, id: index + 1, rating})
})
const data = JSON.stringify({schools}, null, 2);

await writeFile(new URL('../data/db.json', import.meta.url), data);