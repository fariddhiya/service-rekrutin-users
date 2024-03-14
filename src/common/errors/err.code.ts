export enum ErrorCode {
  // SO-SO NEGATIVE
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InvalidRequest = 400,
  ExceededRateLimit = 429,
  Unimplemented = 501,

  // TOO MUCH NEGATIVE
  InternalError = 500,
}
