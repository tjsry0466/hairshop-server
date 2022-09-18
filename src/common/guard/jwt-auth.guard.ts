import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import { ROLES_KEY } from '../decorator';
import { Role } from '../enum';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const activatable = await super.canActivate(context);
    if (!activatable) {
      return false;
    }

    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) {
      return true;
    }

    const req = this.getRequest(context);
    if (req.headers.authorization && !req.user?.id) {
      throw new UnauthorizedException();
    }

    if (roles.includes(req.user?.role)) {
      return true;
    } else {
      return false;
    }
  }

  handleRequest(err, user) {
    if (err) {
      throw err;
    }

    return user || undefined;
  }

  getRequest(context: ExecutionContext) {
    return context.getType() === 'http'
      ? context.switchToHttp().getRequest()
      : GqlExecutionContext.create(context).getContext().req;
  }
}
