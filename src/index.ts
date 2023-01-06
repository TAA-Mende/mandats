import { CronJob } from 'cron';
import { runProxy as proxy } from './server/proxy';
import fetch from './fetch';

// const job = new CronJob(
//   '* * * * * *',
//   async () => {
//     const test = await fetch.fetchHTML(48000);
//     console.log(test);
//   },
//   undefined,
//   false,
//   'Europe/Paris',
// );

// job.start();

proxy().then(async () => {
  const test = await fetch.fetchHTML(48000);
  console.log(test);
});
