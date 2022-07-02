import {readFile, writeFile} from 'fs/promises';
import {Client} from "@googlemaps/google-maps-services-js";
const secrets = await readFile(new URL('../secrets/secrets.json', import.meta.url));

const db = await readFile(new URL('../db/db.json', import.meta.url));

const {schools} = JSON.parse(db);
const {apiKey} = JSON.parse(secrets);

const map = new Client({});

const schoolsPromiseArray = schools.map(school => {
    const {address} = school;
    return map.textSearch({
        params: {
            query: `Polska, Warszawa, ${address}`,
            language: "pl",
            key: apiKey
        },
    }).then(response => {
        const {location} = response.data.results[0].geometry
        return ({
            ...school,
            location
        })
    })
})

const results = await Promise.allSettled(schoolsPromiseArray).then(results => results?.map(({value}, index) => value ?? schools[index]));
const data = JSON.stringify(results, null, 2);

await writeFile(new URL('../db/db.json', import.meta.url), data);
