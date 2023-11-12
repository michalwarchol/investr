import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/constants';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { decode } from 'jsonwebtoken';

type JwtPayload = {
  id?: string;
  email?: string;
  role?: Role;
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const { headers } = context.switchToHttp().getRequest();
    const authorization = headers.authorization;

    if (!authorization) {
      return false;
    }

    const token = authorization.split(' ')[1];
    const payload: JwtPayload = decode(token) as JwtPayload;

    if (!payload.role) {
      return false;
    }

    return requiredRoles.some((requiredRole) => payload.role === requiredRole);
  }
}
