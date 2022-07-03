import {readFile, writeFile} from 'fs/promises';
import {Client} from "@googlemaps/google-maps-services-js";
const secrets = await readFile(new URL('../secrets/secrets.json', import.meta.url));

const db = await readFile(new URL('../data/db.json', import.meta.url));

const {"preschools-public": preschoolsPublic} = JSON.parse(db);
const {apiKey} = JSON.parse(secrets);

const map = new Client({});

const preschoolsPublicPromiseArray = preschoolsPublic.map(preschool => {
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

const results = await Promise.allSettled(preschoolsPublicPromiseArray).then(results => results?.map(({value}, index) => value ?? preschoolsPublic[index]));
const data = JSON.stringify({...JSON.parse(db), "preschools-public": results}, null, 2);

await writeFile(new URL('../data/db.json', import.meta.url), data);
