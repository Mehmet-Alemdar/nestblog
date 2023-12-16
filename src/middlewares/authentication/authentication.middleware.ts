import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if(!token) {
      throw new HttpException("Not authorized.", HttpStatus.UNAUTHORIZED);
    }
    try {
      const verified = jwt.verify(token, "secret");
      req.user = verified;
      next();
    } catch (error) {
     throw new HttpException("Not authorized.", HttpStatus.UNAUTHORIZED);   
    }
  }
}
