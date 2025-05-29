import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoggerService } from 'src/logger.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly logger: LoggerService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // throw new Error(`error in auth`);
    const request = context.switchToHttp().getRequest();
    const apiKey = request.header(`x-api-key`);
    this.logger.info(`apiKey:${apiKey}`);
    if (apiKey === 'SECRET') {
      this.logger.info(`Guard:passed authentication`);
      return true;
    }
    console.log(`Guard:failed authentication`);
    return false;
  }
}
