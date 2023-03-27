import {google} from 'googleapis';

const sheets = google.sheets('v4');

export async function getSpreadsheetData() {
    const authClient = await authorize();

    const request = {
        // The ID of the spreadsheet to retrieve data from.
        spreadsheetId: process.env.NEXT_PRIVATE_SPREADSHEET_ID,
        // spreadsheetId: process.env.NEXT_PRIVATE_SPREADSHEET_ID || process.env.SPREADSHEET_ID,

        // The A1 notation of the values to retrieve.
        range: 'flats!A2:P50',

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

        return flatsRawData.values.map(([id, address, phone, price, lat, lng, parking, bathroom, park, metro, school, preschool, rating, available, visible, link], index) => {
            return ({
                id: Number(id),
                address: address ?? '',
                phone: phone ?? '',
                price: price ? Number(price) : null,
                location: {
                    lat: Number(String(lat)?.replace(',', '.')),
                    lng: Number(String(lng)?.replace(',', '.')),
                },
                parking: Boolean(parking),
                bathroom: Boolean(bathroom),
                park: Boolean(park),
                metro: Boolean(metro),
                school: Boolean(school),
                preschool: Boolean(preschool),
                rating: Number(rating),
                available: Boolean(available),
                visible: Boolean(visible),
                link: link ?? ''
            })
        })
    } catch (err) {
        console.error(err);
    }
}

const formatBoolean = (value) => value ? 1 : "";
const formatNumber = (numb) => isNaN(Number(numb)) ? "" : Number(numb);
const formatString = (str) => str ?? "";

export async function setSpreadsheetData({
    id,
    address,
    phone,
    price,
    location,
    parking,
    bathroom,
    park,
    metro,
    school,
    preschool,
    rating,
    available,
    visible,
    link
}) {
    const authClient = await authorize();
    const {lat, lng} = location || {};

    let values = [
        [
            formatNumber(id),
            formatString(address),
            formatString(phone),
            formatNumber(price),
            formatNumber(lat),
            formatNumber(lng),
            formatBoolean(parking),
            formatBoolean(bathroom),
            formatBoolean(park),
            formatBoolean(metro),
            formatBoolean(school),
            formatBoolean(preschool),
            formatNumber(rating),
            formatBoolean(available),
            formatBoolean(visible),
            formatString(link)
        ],
    ];
    const resource = {
        values,
    };
    const request = {
        // The ID of the spreadsheet to retrieve data from.
        spreadsheetId: process.env.NEXT_PRIVATE_SPREADSHEET_ID,
        // spreadsheetId: process.env.NEXT_PRIVATE_SPREADSHEET_ID || process.env.SPREADSHEET_ID,

        // The A1 notation of the values to retrieve.
        range: `flats!A${id + 1}:P${id + 1}`,

        auth: authClient,
        valueInputOption: "USER_ENTERED",
        resource
    };

    try {
        return await sheets.spreadsheets.values.update(request)
    } catch (err) {
        //
    }
}

export async function createSpreadsheetData(flat) {
    const flats = await getSpreadsheetData();
    const ids = new Set(flats.map(({id}) => id));
    const max = Math.max(...Array.from(ids));

    if (max === ids.size) {
        const newFlat = {...flat, id: max + 1};
        await setSpreadsheetData(newFlat);

        return newFlat;
    }

    let index = 1;

    for (; index <= ids.size; index ++) {
        if (!ids.has(index)) break;
    }

    const newFlat = {...flat, id: index};

    await setSpreadsheetData(newFlat);

    return newFlat;
}

export async function deleteSpreadsheetData(id) {
    const authClient = await authorize();

    const request = {
        // The ID of the spreadsheet to retrieve data from.
        spreadsheetId: process.env.NEXT_PRIVATE_SPREADSHEET_ID,
        // spreadsheetId: process.env.NEXT_PRIVATE_SPREADSHEET_ID || process.env.SPREADSHEET_ID,

        // The A1 notation of the values to retrieve.
        range: `flats!A${id + 1}:P${id + 1}`,

        auth: authClient,
    };

    try {
        return await (sheets.spreadsheets.values.clear(request))
    } catch (err) {
        console.log(err);
    }
}

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
        scopes: 'https://www.googleapis.com/auth/spreadsheets' // for readonly mode write 'https://www.googleapis.com/auth/spreadsheets.readonly'
    });

    if (authClient == null) {
        throw Error('authentication failed');
    }

    return authClient;
}

// await setSpreadsheetData({
//     id: 3,
//     address: "Example Address",
//     phone: "123 456 789",
//     school: 1,
//     available: true,
//     visible: true,
// });