/* ---------- External ---------- */
import { Router, Request, Response, NextFunction } from 'express';

/* ---------- Logs ---------- */
import { logger } from '../../common/utils/logs';

/* ---------- Common ---------- */
import { authentication_middleware } from '../../common/middlewares/authentication.middleware';

/* ---------- Controllers ---------- */
import { StoreController } from '../../controllers/store/index.controller';

/* ---------- Objects instances ---------- */
const store_routes = Router();
const store_controller = new StoreController();

/** ----------
 * @description:
 * @method: POST
 * @name: /store/:item_id/purchase
 * ---------- */
store_routes.post(
  '/store/:item_id/purchase',
  authentication_middleware,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      logger.info('Calling endpoint POST /store/:item_id/purchase');

      logger.debug('Params: ');
      logger.debug(request.params);
      logger.debug('Query: ');
      logger.debug(request.query);
      logger.debug('Body: ');
      logger.debug(request.body);
      logger.debug('Headers: ');
      logger.debug(request.headers);

      await store_controller.purchase_an_item(request, response);
    } catch (error) {
      next(error);
    }
  },
);

export { store_routes };
