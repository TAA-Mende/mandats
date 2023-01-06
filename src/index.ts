import { CronJob } from 'cron';
import './server/proxy';

const job = new CronJob(
  '* * * * * *',
  () => {
    console.log('Hello, World!');
  },
  undefined,
  false,
  'Europe/Paris',
);

job.start();
