import {createSpreadsheetData} from "../../scripts/spreadsheet.mjs";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const newFlat = await createSpreadsheetData(req.body);

        res.status(200).json({message: `Updated`, newFlat});
    } else {
        res.status(200).json({message: 'Not supported'});
    }
}
