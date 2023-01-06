import axios from 'axios';
import { load } from 'cheerio/lib/slim';
import fs from 'fs/promises';

const depCode = 48000;
const url = `https://www.ffta.fr/ws/epreuves?ChxDepartement=${depCode}`;
const baseMandatLink = 'http://extranet.ffta.fr/medias/documents_epreuves/';
const year = new Date().getFullYear();

(async () => {
  const { data: document } = await axios.get<string>(url);
  const $ = load(document);
  const mandats = $('.results');

  const newDocuments = [];

  for (const {
    attribs: { href },
  } of mandats) {
    const id = href.replace(baseMandatLink, '').replace('.pdf', '');
    newDocuments.push({ id, href });
  }

  await fs.writeFile(
    `mandats-${year}.json`,
    JSON.stringify(newDocuments, null, 2),
  );
})();
