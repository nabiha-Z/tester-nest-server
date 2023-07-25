import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from 'src/Auth/constants';

@Injectable()
export class JwtService {
  private readonly secretKey = jwtConstants.secret;
  private readonly blacklistedTokens: string[] = [];

  revokeToken(token: string): void {
   this.blacklistedTokens.push(token);
  }

  isTokenRevoked(token: string): boolean {
    return this.blacklistedTokens.includes(token);
  }
}
