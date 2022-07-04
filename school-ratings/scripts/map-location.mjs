import {Client} from "@googlemaps/google-maps-services-js";

export default async function getLocation(address) {
    const map = new Client({});

    return map.textSearch({
        params: {
            query: `Polska, Warszawa, ${address}`,
            language: "pl",
            key: process.env.NEXT_PUBLIC_API_KEY
        },
    }).then(response => {
        const {location} = response.data.results[0].geometry.location;

        return location;
    }).catch(() => null)
}
