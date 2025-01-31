/* ---------- External ---------- */
import { Router, Request, Response, NextFunction } from 'express';

/* ---------- Logs ---------- */
import { logger } from '../../common/utils/logs';

/* ---------- Common ---------- */
import { authentication_middleware } from '../../common/middlewares/authentication.middleware';

/* ---------- Controllers ---------- */
import { ClassesController } from '../../controllers/classes/index.controller';

/* ---------- Objects instances ---------- */
const classes_routes = Router();
const classes_controller = new ClassesController();

/** ----------
 * @description: Get all classes
 * @method: GET
 * @name: /classes
 * ---------- */
classes_routes.get(
  '/classes',
  authentication_middleware,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      logger.info('Calling endpoint GET /classes');

      logger.debug('Params: ');
      logger.debug(request.params);
      logger.debug('Query: ');
      logger.debug(request.query);
      logger.debug('Body: ');
      logger.debug(request.body);
      logger.debug('Headers: ');
      logger.debug(request.headers);

      await classes_controller.get_classes(request, response);
    } catch (error) {
      next(error);
    }
  },
);

export { classes_routes };
