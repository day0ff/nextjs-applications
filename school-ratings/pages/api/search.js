// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import getLocation from "../../scripts/map-location.mjs";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {address} = req.body;
    const location = await getLocation(address);

    res.status(200).json(location);
  } else {
    res.status(200).json({lat: 0, lng: 0})
  }
}
