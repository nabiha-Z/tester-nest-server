import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as cookie from "cookie";
import { JwtService } from '@nestjs/jwt';

import { jwtConstants } from 'src/Auth/constants';
@Injectable()
export class ChatGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const parsedCookie = cookie.parse(request.handshake.headers.cookie);
    const token = parsedCookie.token
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );
      request['current_user'] = payload;
    } catch(err) {
      throw new UnauthorizedException();
    }
    request['access'] = true;
    return true;
  }
}