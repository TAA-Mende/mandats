import axios from 'axios';

interface InternalTournamentProxy {
  protocol: 'https' | 'http';
  host: string;
  port: number;
}

class TournamentFetcher {
  private proxy: InternalTournamentProxy;

  constructor(
    protocol: InternalTournamentProxy['protocol'],
    host: InternalTournamentProxy['host'],
    port: InternalTournamentProxy['port'],
  ) {
    this.proxy = {
      protocol,
      host,
      port,
    };
  }

  public async fetchHTML(dep: number) {
    const { protocol, host, port } = this.proxy;
    const url = `${protocol}://${host}:${port}/proxy/epreuves?ChxDepartement=${dep}`;
    const { data } = await axios.get(url);
    return data as string;
  }

  // http://extranet.ffta.fr/medias/documents_epreuves/fe69e45211531.pdf
  public getMandat(id: string) {
    return axios.get(
      `http://extranet.ffta.fr/medias/documents_epreuves/${id}.pdf`,
      { responseType: 'stream' },
    );
  }
}

export default new TournamentFetcher('http', 'localhost', 3001);
