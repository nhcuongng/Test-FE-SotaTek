import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

export interface ComposedError {
  readonly message: string;
  readonly error: AxiosError;
  handleGlobally(): void;
  getError(): AxiosError;
}

/**
 * https://medium.com/@ejjay/a-short-ajax-story-on-error-handlers-8baeeccbc062
 */
class ComposedAxiosError implements ComposedError {
  name: string = 'ComposedAxiosError';

  public readonly message: string;

  public readonly error: AxiosError;

  constructor(error: AxiosError) {
    this.error = error;
    const statusCode = error.response ? error.response.status : null;

    switch (statusCode) {
      case 401:
        this.message = 'Please login to access this resource';
        break;
      case 404:
        this.message = 'The requested resource does not exist or has been deleted';
        break;
      default:
        this.message = 'Something went wrong and request was not completed';
    }
  }

  public getError(): AxiosError {
    return this.error;
  }

  public handleGlobally(): void {
    toast.error(this.message);
  }
}

/**
 * Toast error if server return error
 *
 * @param error
 * @returns
 */
const errorHandler = (error: AxiosError) => {
  const composedError = new ComposedAxiosError(error);
  return Promise.reject(composedError);
};

const resultHandler = (response: AxiosResponse) => {
  if (!response?.data) {
    console.error(`Data is undefined :: [${response.config.url}]`);
    return response;
  }

  return response;
};

export const API = axios.create({
  baseURL: '/api',
  timeout: 1000,
});

// apply interceptor on response
API.interceptors.response.use(
  resultHandler,
  errorHandler,
);
