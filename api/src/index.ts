import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { cors } from 'hono/cors';
import { config as loadEnv } from 'dotenv';
import { checkCorsOrigin } from './utils/checkCorsOrigin';
import { errorMiddleware } from './middleware/error';

loadEnv();
const PORT = Number(process.env.PORT) || 3000;
const CORS_ORIGINS = process.env.CORS_ORIGINS?.split(';');

const app = new Hono();

app.use(logger());
app.use(prettyJSON());
app.use(
  cors({
    origin: CORS_ORIGINS || checkCorsOrigin,
  })
);
app.use(errorMiddleware);

app.get('/', async (ctx) => {
  return ctx.body('Hello, world');
});

serve(
  {
    ...app,
    port: PORT,
  },
  (info) => {
    console.log(`Server started at http://localhost:${info.port}`);
  }
);
