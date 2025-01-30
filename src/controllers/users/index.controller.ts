/* ---------- External ---------- */
import { decode } from 'base-64';
import { hash, genSalt, compare } from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

/* ---------- Common ---------- */
import { create_http_error } from '../../common/errors/http';
import { logger } from '../../common/utils/logs';
import { secret_key } from '../../common/config';

/* ---------- Repositories ---------- */
import { UserRepository } from '../../repositories/users/users.repository';

export class UsersController {
  private logger = logger;
  private users_repository = new UserRepository();

  /**
   * @description Authenticate a user by username and password
   * @param request
   * @param response
   * @returns Promise<Response>
   */
  public authenticate_user = async (
    request: Request,
    response: Response,
  ): Promise<Response> => {
    try {
      const { headers } = request;
      const { authorization } = headers;

      this.logger.info('Authenticating user...');
      this.logger.debug({ headers });

      // TODO:
      // Replace this with a error handling middleware
      if (!authorization || !authorization.includes('Basic')) {
        this.logger.error('No authorization header found');

        return create_http_error({ response, code: 401 });
      }

      const credentials = decode(authorization.replace('Basic ', ''));

      const [email, ...password_pieces] = credentials.split(':');

      const password = password_pieces.join('');

      if (!email || !password) {
        this.logger.error('No email or password found');

        return create_http_error({ response, code: 401 });
      }

      const salt = await genSalt(10);
      const hashed_password = await hash(password, salt);

      this.logger.info('Getting user by email...');
      this.logger.debug({
        email,
        password,
        hashed_password,
      });

      const user = await this.users_repository.get_user_by_email({
        email,
      });

      if (!user) {
        this.logger.error('User not found');

        return create_http_error({ response, code: 401 });
      }

      const is_valid_password = await compare(password, user.password);

      if (!is_valid_password) {
        this.logger.error('Invalid password');

        return create_http_error({ response, code: 401 });
      }

      this.logger.info('User authenticated');
      this.logger.debug({ user });

      this.logger.info('Creating token...');

      const token = jwt.sign(
        {
          user_id: user.user_id,
        },
        secret_key,
        {
          expiresIn: '1d',
        },
      );

      this.logger.info('Token created');
      this.logger.debug({ token });

      return response.status(200).json({
        token,
      });
    } catch (error) {
      logger.error(error);
      logger.error('Error at GET /users/authentication');

      return response.status(500).json({
        code: '500',
        message: 'Internal server error',
      });
    }
  };

  /**
   * @description Get a user by id
   * @param request
   * @param response
   * @returns Repository<User>
   */
  public get_user_by_id = async (
    request: Request,
    response: Response,
  ): Promise<Response> => {
    const { id } = request.params;

    this.logger.info('Getting user by id...');
    this.logger.debug({ id });

    const user = await this.users_repository.get_user_by_id(Number(id));

    this.logger.info('User found');
    this.logger.debug({ user });

    return response.status(200).json({
      ...user,
    });
  };

  /**
   * @description Create a user
   * @param request
   * @param response
   * @returns Repository<User>
   *
   * TODO: Add validation
   */
  public create_user = async (
    request: Request,
    response: Response,
  ): Promise<Response> => {
    const { first_name, last_name, email, password } = request.body;

    this.logger.info('Creating user...');
    this.logger.debug({ first_name, last_name, email, password });

    const salt = await genSalt(10);
    const hashed_password = await hash(password, salt);

    const user = await this.users_repository.create_user({
      first_name,
      last_name,
      email,
      password: hashed_password,
    });

    this.logger.info('User created');
    this.logger.debug({ user });

    return response.status(200).json({
      ...user,
    });
  };
}
