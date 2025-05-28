import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    throw new UnauthorizedException();
    const request = context.switchToHttp().getRequest();
    const apiKey = request.header(`x-api-key`);
    console.log(`apiKey:${apiKey}`);
    if (apiKey === 'SECRET') {
      console.log(`Guard:passed authentication`);
      return true;
    }
    console.log(`Guard:failed authentication`);
    return false;
  }
}
