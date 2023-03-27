import {deleteSpreadsheetData} from "../../scripts/spreadsheet.mjs";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {id} = req.body;
        await deleteSpreadsheetData(id);

        res.status(200).json({message: `Deleted ${id}`, id});
    } else {
        res.status(200).json({message: 'Not supported'});
    }
}
