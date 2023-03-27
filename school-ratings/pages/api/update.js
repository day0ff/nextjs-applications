import {setSpreadsheetData} from "../../scripts/spreadsheet.mjs";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = await setSpreadsheetData(req.body);

        res.status(200).json({message: `Updated`, data});
    } else {
        res.status(200).json({message: 'Not supported'});
    }
}
