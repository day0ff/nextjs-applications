import {readFile, writeFile} from 'fs/promises';

const db = await readFile(new URL('../db/db.json', import.meta.url));
const rawFlatsData = await readFile(new URL('../db/raw-flat-data.json', import.meta.url));
const dbData = JSON.parse(db);
const flatsData = JSON.parse(rawFlatsData);

const flats = flatsData.values.map(([id, address, phone, price, previousPrice, rating, lat, lng, hidden, link], index) => {
    return ({
        id: Number(id),
        address,
        phone,
        price: price ? Number(price) : null,
        previousPrice: previousPrice ? Number(previousPrice) : null,
        rating: Number(rating),
        link,
        location: {
            lat,
            lng
        },
        hidden: hidden !== "FALSE"
    })
})
const data = JSON.stringify({...dbData, flats}, null, 2);

await writeFile(new URL('../db/db.json', import.meta.url), data);