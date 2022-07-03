import {readFile, writeFile} from 'fs/promises';

const db = await readFile(new URL('../data/db.json', import.meta.url));
const rawFlatsData = await readFile(new URL('../data/raw-preschool-private-data.json', import.meta.url));
const dbData = JSON.parse(db);
const flatsData = JSON.parse(rawFlatsData);

const preschoolsPrivate = flatsData.values.map(([id, district, name, street, nr, locale, post], index) => {
    return ({
        id: Number(id),
        name,
        address: `${district}, ${street} ${nr} ${locale}`,
        district
    })
})
const data = JSON.stringify({...dbData, "preschools-private": preschoolsPrivate}, null, 2);

await writeFile(new URL('../data/db.json', import.meta.url), data);