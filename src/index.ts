import { runProxy as proxy } from './server/proxy';
import fetch from './fetch';
import { load } from 'cheerio/lib/slim';
import fs from 'fs';
import path from 'path';

const link = 'http://extranet.ffta.fr/medias/documents_epreuves/';
proxy().then(async () => {
  const document = await fetch.fetchHTML(48000);
  const $ = load(document);

  const mandats = $('.results');
  for (const mandat of mandats) {
    const { href } = mandat.attribs;
    const id = href.replace(link, '').replace('.pdf', '');
    const filePath = path.join(__dirname, `/mandats/${id}.pdf`);

    if (!fs.existsSync(filePath)) {
      console.log('alert! new mandat found');
      const response = await fetch.getMandat(id);
      response.data.pipe(
        fs.createWriteStream(path.join(__dirname, `/mandats/${id}.pdf`)),
      );
    }
  }
});
