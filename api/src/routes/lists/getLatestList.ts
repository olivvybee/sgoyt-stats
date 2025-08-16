import { getDB } from '../../db/getDB';

export const getLatestList = async () => {
  const db = getDB();

  const list = await db.list.findFirst({
    orderBy: {
      id: 'desc',
    },
  });

  return list;
};
