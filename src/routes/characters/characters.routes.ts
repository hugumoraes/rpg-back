/* ---------- External ---------- */
import { Router, Request, Response, NextFunction } from 'express';

/* ---------- Logs ---------- */
import { logger } from '../../common/utils/logs';

/* ---------- Common ---------- */
import { authentication_middleware } from '../../common/middlewares/authentication.middleware';

/* ---------- Controllers ---------- */
import { CharactersController } from '../../controllers/characters/index.controller';

/* ---------- Objects instances ---------- */
const characters_routes = Router();
const characters_controller = new CharactersController();

/** ----------
 * @description: Get a single character with all its information
 * @method: GET
 * @name: /characters/:character_id
 * ---------- */
characters_routes.get(
  '/characters/:character_id',
  authentication_middleware,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      logger.info('Calling endpoint GET /characters/:character_id');

      logger.debug('Params: ');
      logger.debug(request.params);
      logger.debug('Query: ');
      logger.debug(request.query);
      logger.debug('Body: ');
      logger.debug(request.body);
      logger.debug('Headers: ');
      logger.debug(request.headers);

      await characters_controller.get_character_by_id(request, response);
    } catch (error) {
      next(error);
    }
  },
);

/** ----------
 * @description: Get all characters
 * @method: GET
 * @name: /characters
 * ---------- */
characters_routes.get(
  '/characters',
  authentication_middleware,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      logger.info('Calling endpoint GET /characters');

      logger.debug('Params: ');
      logger.debug(request.params);
      logger.debug('Query: ');
      logger.debug(request.query);
      logger.debug('Body: ');
      logger.debug(request.body);
      logger.debug('Headers: ');
      logger.debug(request.headers);

      await characters_controller.get_characters(request, response);
    } catch (error) {
      next(error);
    }
  },
);

/** ----------
 * @description:
 * @method: POST
 * @name: /characters
 * ---------- */
characters_routes.post(
  '/characters',
  authentication_middleware,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      logger.info('Calling endpoint POST /characters');

      logger.debug('Params: ');
      logger.debug(request.params);
      logger.debug('Query: ');
      logger.debug(request.query);
      logger.debug('Body: ');
      logger.debug(request.body);
      logger.debug('Headers: ');
      logger.debug(request.headers);

      await characters_controller.create_character(request, response);
    } catch (error) {
      next(error);
    }
  },
);

export { characters_routes };
