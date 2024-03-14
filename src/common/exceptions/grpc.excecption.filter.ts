import { ArgumentsHost, Catch, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { ServerUnaryCallImpl } from '@grpc/grpc-js/build/src/server-call';
import { ValidationError, BaseError } from '../errors';
import { redactBodies } from '../utils/redacted.bodies';
import { redactHeaders } from '../utils/redacted.header';
import { GrpcDictionary } from '../consts/status.code';
import { Request } from '../logger/logger.dto';
import { SuperLogger } from '../logger/logger.service';

@Catch()
export class GrpcExceptionFilter implements RpcExceptionFilter<RpcException> {
  constructor(private readonly logger: SuperLogger) {}

  catch(e: RpcException, host: ArgumentsHost): Observable<any> {
    const args = host.getArgs();
    let call: any = undefined;

    for (const arg of args) {
      if (arg instanceof ServerUnaryCallImpl) {
        call = arg;
      }
    }

    // Note
    // Why using split if instead of switch-case?
    // The intention here is to make sure,
    // if any error(s) has custom function can be use at devs' will
    //
    // There is no need throw any error again,
    // as devs understood it is business error

    if (e instanceof BaseError) {
      const grpcStatus = GrpcDictionary[e.getCode()];

      let message: string | string[] = e.message;
      if (e instanceof ValidationError) {
        message = e.bags.length > 0 ? e.bags : e.message;
      }

      this.logger.fromTransport(
        'gRPC',
        call.getPath().split('/')[2],
        this._requestCatcher(call),
        'error',
        e,
        grpcStatus,
      );

      return throwError(() => ({
        code: grpcStatus,
        message: message,
      }));
    }

    this._uncaughtErrorLog(e, call);
    return throwError(() => e);
  }

  private _uncaughtErrorLog(e: Error, call: any) {
    this.logger.fromTransport(
      'gRPC',
      'UnCaught Error',
      this._requestCatcher(call),
      'error',
      e,
      500,
    );
  }

  private _requestCatcher(call: ServerUnaryCallImpl<any, any>): Request {
    if (!call) {
      return null;
    }

    const catched: Request = {
      method: '',
      url: call.getPath(),
      body: redactBodies(call.request),
      headers: redactHeaders(call.metadata.toHttp2Headers()),
    };

    return catched;
  }
}
