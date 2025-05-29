import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { createMock } from '@golevelup/ts-jest';
import { LoggerService } from 'src/logger.service';

describe('AuthGuard', () => {
  const authGuard = new AuthGuard(new LoggerService());
  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  it(`should return true if there is a valid api key`, () => {
    const context = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          header: () => `SECRET`,
          headers: {
            'x-api-key': `SECRET`,
          },
        }),
      }),
    });

    const result = authGuard.canActivate(context);
    expect(result).toBe(true);
  });

  it(`should return false if no header is passed in `, () => {
    const context = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          header: () => undefined,
          headers: {},
        }),
      }),
    });

    const result = authGuard.canActivate(context);
    expect(result).toBe(false);
  });

  it(`should return false if api key is invalid`, () => {
    const context = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          header: () => `INVALID`,
          headers: {
            'x-api-key': `INVALID`,
          },
        }),
      }),
    });

    const result = authGuard.canActivate(context);
    expect(result).toBe(false);
  });
});
