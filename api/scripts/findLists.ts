/**
 * Find new SGOYT lists and add them to the database.
 */

import { config as loadEnv } from 'dotenv';

import { BGGClient } from '@/bgg';
import { getLatestList, createList } from '@/db/lists';

const SUBSCRIPTION_THREAD_ID = 986303;

const runScript = async () => {
  const latestList = await getLatestList();

  const bgg = new BGGClient(process.env.BGG_API_KEY || '');
  const thread = await bgg.thread(SUBSCRIPTION_THREAD_ID, {
    after: latestList?.announcementPostId,
  });

  console.log(thread);

  // Find posts that have been added since the latest one

  // Find the link in the posts to get the id of the list

  // Fetch the lists to get their name, host, etc

  // Save them in the db
};

loadEnv();
runScript();
