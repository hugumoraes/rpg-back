/* ---------- External ---------- */
import { Router, Request, Response, NextFunction } from 'express';

/* ---------- Logs ---------- */
import { logger } from '../../common/utils/logs';

/* ---------- Controllers ---------- */
import { UsersController } from '../../controllers/users/index.controller';

/* ---------- Objects instances ---------- */
const users_routes = Router();
const users_controller = new UsersController();

/** ----------
 * @description: This route is used to authenticate a user
 * @method: GET
 * @name: /authentication
 * ---------- */
users_routes.get(
  '/users/authentication',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      logger.info('Calling endpoint GET /users/authentication');

      logger.debug('Params: ');
      logger.debug(request.params);
      logger.debug('Query: ');
      logger.debug(request.query);
      logger.debug('Body: ');
      logger.debug(request.body);
      logger.debug('Headers: ');
      logger.debug(request.headers);

      await users_controller.authenticate_user(request, response);
    } catch (error) {
      next(error);
    }
  },
);

/** ----------
 * @description:
 * @method: GET
 * @name: /users
 * ---------- */
users_routes.get(
  '/users/:id',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      logger.info('Calling endpoint GET /users/:id');

      logger.debug('Params: ');
      logger.debug(request.params);
      logger.debug('Query: ');
      logger.debug(request.query);
      logger.debug('Body: ');
      logger.debug(request.body);
      logger.debug('Headers: ');
      logger.debug(request.headers);

      await users_controller.get_user_by_id(request, response);
    } catch (error) {
      next(error);
    }
  },
);

/** ----------
 * @description:
 * @method: POST
 * @name: /users
 * ---------- */
users_routes.post(
  '/users',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      logger.info('Calling endpoint POST /users');

      logger.debug('Params: ');
      logger.debug(request.params);
      logger.debug('Query: ');
      logger.debug(request.query);
      logger.debug('Body: ');
      logger.debug(request.body);
      logger.debug('Headers: ');
      logger.debug(request.headers);

      await users_controller.create_user(request, response);
    } catch (error) {
      next(error);
    }
  },
);

/** ----------
 * @description:
 * @method: DELETE
 * @name: /users
 * ---------- */
users_routes.delete(
  '/users/:id',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      logger.info('Calling endpoint DELETE /users/:id');

      logger.debug('Params: ');
      logger.debug(request.params);
      logger.debug('Query: ');
      logger.debug(request.query);
      logger.debug('Body: ');
      logger.debug(request.body);
      logger.debug('Headers: ');
      logger.debug(request.headers);

      // await users_controller.get_character_by_id(request, response);
    } catch (error) {
      next(error);
    }
  },
);

export { users_routes };
