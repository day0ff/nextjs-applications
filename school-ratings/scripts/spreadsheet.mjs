import {google} from 'googleapis';

import secrets from "../secrets/secrets.json";

const sheets = google.sheets('v4');

export default async function getSpreadsheetData() {
    const {spreadsheetId} = secrets;

    const authClient = await authorize();

    const request = {
        // The ID of the spreadsheet to retrieve data from.
        spreadsheetId,

        // The A1 notation of the values to retrieve.
        range: 'flats!A2:O50',

        // How values should be represented in the output.
        // The default render option is ValueRenderOption.FORMATTED_VALUE.
        valueRenderOption: 'FORMATTED_VALUE',

        // How dates, times, and durations should be represented in the output.
        // This is ignored if value_render_option is
        // FORMATTED_VALUE.
        // The default dateTime render option is [DateTimeRenderOption.SERIAL_NUMBER].
        dateTimeRenderOption: 'FORMATTED_STRING',
        majorDimension: 'ROWS',
        auth: authClient,
    };

    try {
        const flatsRawData = (await sheets.spreadsheets.values.get(request)).data;

        return flatsRawData.values.map(([id, address, phone, price, lat, lng, parking, bathroom, park, metro, school, preschool, rating, available, link], index) => {
            return ({
                id: Number(id),
                address,
                phone,
                price: price ? Number(price) : null,
                location: {
                    lat,
                    lng
                },
                parking: Boolean(parking),
                bathroom: Boolean(bathroom),
                park: Boolean(park),
                metro: Boolean(metro),
                school: Boolean(school),
                preschool: Boolean(preschool),
                rating: Number(rating),
                available: available !== "FALSE",
                link
            })
        })
    } catch (err) {
        console.error(err);
    }
};

async function authorize() {
    // https://developers.google.com/sheets/quickstart/nodejs#step_3_set_up_the_sample
    //
    // Authorize using one of the following scopes:
    //   'https://www.googleapis.com/auth/drive'
    //   'https://www.googleapis.com/auth/drive.file'
    //   'https://www.googleapis.com/auth/drive.readonly'
    //   'https://www.googleapis.com/auth/spreadsheets'
    //   'https://www.googleapis.com/auth/spreadsheets.readonly'
    const authClient = await google.auth.getClient({
        keyFile: 'secrets/credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets.readonly'
    });

    if (authClient == null) {
        throw Error('authentication failed');
    }

    return authClient;
}