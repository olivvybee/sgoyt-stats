import { bearerAuth } from 'hono/bearer-auth';
import { createMiddleware } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';

export const authMiddleware = createMiddleware(async (ctx, next) => {
  const token = process.env.API_KEY;
  if (!token) {
    throw new HTTPException(500, {
      message: 'API_KEY environment variable not set',
    });
  }

  const auth = bearerAuth({
    token,
    noAuthenticationHeaderMessage: 'API key missing',
    invalidTokenMessage: 'Invalid API key',
  });
  return auth(ctx, next);
});
