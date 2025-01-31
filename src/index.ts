/* ---------- External ---------- */
import express from 'express';
import cors from 'cors';

/* ---------- Helpers ---------- */
import { logger } from './common/utils/logs';

/* ---------- Routes ---------- */
import { routes } from './routes';

/* ---------- Helpers constants ---------- */
const port = 3334;

/**
 * @description Manages NodeJS server settings.
 *  ---------- */
const app = express();

/* ---------- Middlewares ---------- */
app.use(express.json());
app.use(cors());

/* ---------- Routes ---------- */
app.use(routes);

/* ---------- Server start ---------- */
app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
});
