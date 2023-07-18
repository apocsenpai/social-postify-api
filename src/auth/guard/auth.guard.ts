import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const { authorization } = request.headers;

    const token = authorization?.split(' '[1]);

    try {
      const data = this.authService.checkToken(token);

      const user = this.userService.findUserById(data.sub);

      request.user = user;
    } catch (error) {
      return false;
    }

    return true;
  }
}
