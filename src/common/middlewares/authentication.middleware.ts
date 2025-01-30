/* ---------- External ---------- */
import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

/* ---------- Config ---------- */
import { secret_key } from '../config';

/* ---------- Utils ---------- */
import { logger } from '../utils/logs';

/* ---------- Errors ---------- */
import { create_http_error } from '../errors/http';

/* ---------- Custom Request Type ---------- */
interface AuthenticatedRequest extends Request {
  body: {
    user_id?: string;
  };
}

const authentication_middleware: RequestHandler = (
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction,
): Promise<void> | void => {
  try {
    const token = request.headers.authorization;

    logger.info('Authentication middleware');
    logger.debug('Token: ');
    logger.debug(token);

    if (!token) {
      create_http_error({
        code: 401,
        response,
      });

      return;
    }

    const [, token_value] = token.split(' ');

    const decoded = jwt.verify(token_value, secret_key) as JwtPayload;

    logger.info('Token decoded.');
    logger.debug('Decoded token: ');
    logger.debug(decoded);

    request.body.user_id = decoded.user_id;

    next();
  } catch (error) {
    logger.error('Error at authentication_middleware');
    logger.error(error);

    create_http_error({
      code: 401,
      response,
    });
  }
};

export { authentication_middleware };
