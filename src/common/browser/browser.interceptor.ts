import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BrowserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const userAgent = request.header(`user-agent`);
    console.log(`Browser: ${userAgent}`);
    const browserClient = userAgent.split(` `)[0] || `Unknown`;

    request.headers.browser = browserClient;
    console.log(
      `Interceptor  manupilated request with new browser header : ${request.headers.browser}`,
    );
    return next.handle();
  }
}
