import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_SKIP_JWT } from 'src/guard.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isSkipJWT = this.reflector.getAllAndOverride<boolean>(IS_SKIP_JWT, [
      context.getHandler(),
      context.getClass,
    ]);
    if (isSkipJWT) {
      return true;
    }
    return super.canActivate(context);
  }
}
