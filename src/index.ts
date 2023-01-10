/* eslint-disable no-console */
import fs from 'fs/promises';

import axios from 'axios';
import { load, Element } from 'cheerio/lib/slim';

const depCode = 48000;
const url = `https://www.ffta.fr/ws/epreuves?ChxDepartement=${depCode}`;

function getInformationFromLine(line: Element) {
  const dataChildren = line.children.filter(
    (children) => children.type !== 'text',
  );
  const data = dataChildren[2] as Element;

  // Warning: cannot be undefined
  const dl = data.children.find(
    (children) => children.type === 'tag',
  ) as Element;

  const result = dl.children.filter((children) => children.type === 'tag');

  // @ts-expect-error miss types
  const state = result[1].children[0].children[0].data;
  let link;
  if (state === 'Validée') {
    // @ts-expect-error miss types
    link = dataChildren[0].children
      .filter((child: any) => child.type === 'tag')[1]
      .children.filter((child: any) => child.type === 'tag')[0].attribs.href;
  }

  return {
    state,
    // @ts-expect-error miss types
    org: format(result[3].children[0].data),
    // @ts-expect-error miss types
    name: format(result[5].children[0].data),
    // @ts-expect-error miss types
    date: format(result[17].children[0].data),
    link,
  };
}

function format(s: string): string {
  return s.replace(/ {3,}/g, '').replaceAll('\n', '').replace('  ', ' ');
}

async function exec() {
  const { data: document } = await axios.get<string>(url);
  const $ = load(document);
  const mandats = $('.result-item');

  const newDocuments = [];
  for (const line of mandats) {
    const informations = getInformationFromLine(line);
    newDocuments.push({ ...informations });
  }

  await fs.writeFile(
    `export/mandats.json`,
    JSON.stringify(newDocuments, null, 2),
  );
}

exec().catch(console.error);
