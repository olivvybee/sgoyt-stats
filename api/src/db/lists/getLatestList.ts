import { getDB } from '../getDB';

export const getLatestList = async () => {
  const db = getDB();

  const list = await db.list.findFirst({
    orderBy: {
      id: 'desc',
    },
  });

  return list;
};
