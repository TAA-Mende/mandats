import { CronJob } from 'cron';

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
