import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { authMiddleware } from '../../middleware/auth';
import { createList, createListSchema } from './createList';

export const listsRoute = new Hono();

listsRoute.post(
  '/',
  authMiddleware,
  zValidator('json', createListSchema),
  async (ctx) => {
    const input = ctx.req.valid('json');

    const list = await createList(input);

    return ctx.json(list);
  }
);
