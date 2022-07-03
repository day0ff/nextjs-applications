import {readFile, writeFile} from 'fs/promises';
import {Client} from "@googlemaps/google-maps-services-js";
const secrets = await readFile(new URL('../secrets/secrets.json', import.meta.url));

const db = await readFile(new URL('../data/db.json', import.meta.url));

const {"preschools-private": preschoolsPrivate} = JSON.parse(db);
const {apiKey} = JSON.parse(secrets);

const map = new Client({});

const preschoolsPrivatePromiseArray = preschoolsPrivate.map(preschool => {
    const {address, district} = preschool;
    return map.textSearch({
        params: {
            query: `Polska, Warszawa, ${district}, ${address}`,
            language: "pl",
            key: apiKey
        },
    }).then(response => {
        const {location} = response.data.results[0].geometry
        return ({
            ...preschool,
            location
        })
    })
})

const results = await Promise.allSettled(preschoolsPrivatePromiseArray).then(results => results?.map(({value}, index) => value ?? preschoolsPrivate[index]));
const data = JSON.stringify({...JSON.parse(db), "preschools-private": results}, null, 2);

await writeFile(new URL('../data/db.json', import.meta.url), data);
