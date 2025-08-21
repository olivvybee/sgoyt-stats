import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';

import { createList, createListSchema, getLatestList } from '@/db/lists';

export const listsRoute = new Hono();

listsRoute.post('/', zValidator('json', createListSchema), async (ctx) => {
  const input = ctx.req.valid('json');

  const list = await createList(input);

  return ctx.json(list);
});

listsRoute.get('/latest', async (ctx) => {
  const list = await getLatestList();
  return list ? ctx.json(list) : ctx.notFound();
});
