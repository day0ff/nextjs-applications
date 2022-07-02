import {writeFile} from 'fs/promises';

const data = JSON.stringify({a: 'a', b: 'b'}, null, 4);
await writeFile(new URL('../db/data.json', import.meta.url), data);