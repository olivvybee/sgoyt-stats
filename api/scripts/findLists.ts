/**
 * Find new SGOYT lists and add them to the database.
 */

import { getLatestList, createList } from '@/db/lists';

const SUBSCRIPTION_THREAD_ID = 986303;

const runScript = async () => {
  const latestList = await getLatestList();

  console.log('latest list', latestList);

  // Fetch the thread from BGG

  // Find the newest post and compare its id to the one from the db

  // If it's newer, find the link in the post to get the id of the list

  // Fetch the list to get its name, host, etc

  // Save it in the db
};

runScript();
