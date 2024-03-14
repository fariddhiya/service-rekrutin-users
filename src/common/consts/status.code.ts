import { status } from '@grpc/grpc-js';
import { ErrorCode } from '../errors/err.code';

export enum OKMessage {
  Success = 'Success',
  Ok = 'OK',
  Listing = 'Success get data',
  Create = 'Data has been saved successfully',
  Update = 'Data has been updated',
  Cancel = 'Data has been canceled',
  Empty = 'Data is empty',
  Published = 'Voucher Published',
}

export enum ErrorMessage {
  Error = 'Error',
  Empty = 'Data not found or data is empty',
  InternalServer = 'An error occurred on the internal server',
  Listing = 'Error get data',
  Create = 'Error create data',
  Update = 'Error update data',
  Cancel = 'Error cancel data',
  EmailIsExist = 'Your email is registered',
  EmailIsBlocked = 'Your email is blocked',
  EmailIsActivated = 'Your email has been activated before',
  EmailIsNotActivated = 'Your email not activated',
}

export enum OK {
  Success = 200,
}

export type StatusCode = ErrorCode | OK;

export const GrpcDictionary: Record<StatusCode, number> = {
  // BIG NEWS
  [OK.Success]: status.OK,

  [ErrorCode.Unauthorized]: status.UNAUTHENTICATED,
  [ErrorCode.InvalidRequest]: status.INVALID_ARGUMENT,
  [ErrorCode.NotFound]: status.NOT_FOUND,
  [ErrorCode.Forbidden]: status.PERMISSION_DENIED,
  [ErrorCode.ExceededRateLimit]: status.RESOURCE_EXHAUSTED,

  [ErrorCode.InternalError]: status.UNKNOWN,
  [ErrorCode.Unimplemented]: status.UNIMPLEMENTED,
};
