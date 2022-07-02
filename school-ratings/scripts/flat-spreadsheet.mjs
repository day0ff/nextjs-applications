import { readFile, writeFile } from 'fs/promises';
import {google} from 'googleapis';

const sheets = google.sheets('v4');
const secrets = await readFile(new URL('../secrets/secrets.json', import.meta.url));

const {spreadsheetId} = JSON.parse(secrets);

const authClient = await authorize();

const request = {
    // The ID of the spreadsheet to retrieve data from.
    spreadsheetId,

    // The A1 notation of the values to retrieve.
    range: 'flats!A2:J52',

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
    const response = (await sheets.spreadsheets.values.get(request)).data;
    const data = JSON.stringify(response, null, 2);

    await writeFile(new URL('../db/raw-flat-data.json', import.meta.url), data);
} catch (err) {
    console.error(err);
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
        scopes: 'https://www.googleapis.com/auth/spreadsheets.readonly'
    });

    if (authClient == null) {
        throw Error('authentication failed');
    }

    return authClient;
}