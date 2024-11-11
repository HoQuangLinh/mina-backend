import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ignore_Response_Format } from 'src/decorators/ignore-response-format.decorator';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ignoreResponseFormat = this.reflector.get<boolean>(
      Ignore_Response_Format,
      context.getHandler(),
    );

    if (ignoreResponseFormat) {
      return next.handle();
    }

    return next.handle().pipe(map((data) => ({ data })));
  }
}
