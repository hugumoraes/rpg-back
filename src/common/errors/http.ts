import { Response } from 'express';

interface CreateHttpError {
  code: number;
  response: Response;
}

const messages: Record<number, string> = {
  401: 'Unauthorized',
  500: 'Internal server error',
};

export const create_http_error = ({ response, code }: CreateHttpError) =>
  response.status(code).json({
    code,
    message: messages[code],
  });
