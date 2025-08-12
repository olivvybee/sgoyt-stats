import z from 'zod';
import { getDB } from '../../db/getDB';

export const createListSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  theme: z.string().optional(),
  host: z.object({
    id: z.number().int(),
    username: z.string(),
  }),
});

type CreateListInput = z.infer<typeof createListSchema>;

export const createList = async (input: CreateListInput) => {
  const db = getDB();

  const list = await db.list.create({
    data: {
      id: input.id,
      name: input.name,
      theme: input.theme,
      host: {
        connectOrCreate: {
          where: {
            id: input.host.id,
          },
          create: {
            id: input.host.id,
            username: input.host.username,
          },
        },
      },
    },
  });

  return list;
};
