/* eslint-disable no-console */
import cors from '@fastify/cors';
import proxy from '@fastify/http-proxy';
import fastify from 'fastify';

async function running() {
  const server = fastify();

  await server.register(cors, { origin: true });
  await server.register(proxy, {
    upstream: 'https://www.ffta.fr/ws/epreuves',
    prefix: '/proxy',
  });

  await server.listen({ port: 3001 });
}

running()
  .then(() => console.log('Server running on port 3001'))
  .catch(console.error);
