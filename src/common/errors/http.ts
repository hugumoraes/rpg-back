import { Response } from 'express';

interface CreateHttpError {
  code: number;
  message?: string;
  response: Response;
}

const messages: Record<number, string> = {
  401: 'Unauthorized',
  404: 'Not found',
  500: 'Internal server error',
};

export const create_http_error = ({
  code,
  message,
  response,
}: CreateHttpError) =>
  response.status(code).json({
    code,
    message: message || messages[code],
  });
