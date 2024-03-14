import { ErrorCode } from './err.code';

export class BaseError extends Error {
  protected code: ErrorCode;

  protected err?: BaseError | Error;

  constructor(message?: string) {
    super(message);
    this.name = 'BaseError';

    // 'Error' breaks prototype chain here
    // docs link below
    // https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work
    Object.setPrototypeOf(this, BaseError.prototype);
  }

  public setCode(ec: ErrorCode) {
    this.code = ec;
  }

  public getCode(): ErrorCode {
    return this.code;
  }

  public wrap(err: BaseError | Error) {
    this.err = err;
  }

  public unwrap() {
    if (this.err) {
      return this.err;
    }

    return null;
  }
}

export class ValidationError extends BaseError {
  public bags: string[];

  constructor(message?: string, bags?: string[]) {
    super(message);

    this.name = 'ValidationError';
    this.code = ErrorCode.InvalidRequest;

    this.bags = [];
    if (bags && bags.length > 0) {
      this.bags = bags;
    }

    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class ForbiddenError extends BaseError {
  constructor(message?: string) {
    super(message);

    this.name = 'ForbiddenError';
    this.code = ErrorCode.Forbidden;

    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message?: string) {
    super(message);

    this.name = 'UnauthorizedError';
    this.code = ErrorCode.Unauthorized;

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class NotFoundError extends BaseError {
  constructor(message?: string) {
    super(message);

    this.name = 'NotFoundError';
    this.code = ErrorCode.NotFound;

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class InternalError extends BaseError {
  constructor(message?: string) {
    super(message);

    this.name = 'InternalError';
    this.code = ErrorCode.InternalError;

    Object.setPrototypeOf(this, InternalError.prototype);
  }
}
