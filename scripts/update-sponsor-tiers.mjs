import { resolve } from 'node:path';
import { writeFileSync, copyFileSync } from 'node:fs';
import { config } from 'dotenv';

config({ path: resolve(process.cwd(), '.env') });
const u = process.env.SPONSOR_TIERS_UPDATE_URL;

const filename = resolve(process.cwd(), 'afdian/sponsor-tiers.ts');
const exampleFilename = resolve(
  process.cwd(),
  'afdian/sponsor-tiers-example.ts'
);

if (URL.canParse(u))
  fetch(u)
    .then(resp => {
      if (resp.status !== 200) throw new Error(resp.statusText);
      return resp.arrayBuffer();
    })
    .then(async data => writeFileSync(filename, new Uint8Array(data)));
else copyFileSync(exampleFilename, filename);
