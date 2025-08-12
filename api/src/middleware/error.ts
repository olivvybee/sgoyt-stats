import { createMiddleware } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';

export const errorMiddleware = createMiddleware(async (ctx, next) => {
  await next();

  if (ctx.error) {
    const code = isHTTPException(ctx.error) ? ctx.error.status : 500;

    ctx.res = undefined;
    ctx.res = ctx.json(
      {
        success: false,
        error: {
          name: ctx.error.name,
          message: ctx.error.message,
          cause: ctx.error.cause,
          code,
        },
      },
      code
    );
  }
});

const isHTTPException = <T extends Error>(
  err: HTTPException | T
): err is HTTPException => {
  return 'status' in err;
};
