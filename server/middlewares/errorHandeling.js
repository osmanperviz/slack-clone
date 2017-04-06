import APIError from '../helpers/apiError';
import httpStatus from 'http-status';

export function convertErrors(err, req, res, next) {
  if (!(err instanceof APIError)) {
      const apiError = new APIError(err.message, err.status, err.isPublic);
      return next(apiError);
    }
    return next(err);
   };

  export function handleNotFound(err, req, res, next) {
    const error = new APIError('API not found', httpStatus.NOT_FOUND);
    console.log(error)
    return next(error);
  }
