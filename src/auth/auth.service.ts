import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  private AUDIENCE = 'users';
  private ISSUER = 'SOCIAL_POSTIFY';

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.userService.findUserByEmail(signInDto.email);
    if (!user) throw new UnauthorizedException('Email or password is invalid!');

    const validPassword = bcrypt.compareSync(signInDto.password, user.password);
    if (!validPassword)
      throw new UnauthorizedException('Email or password is invalid!');

    return this.createToken(user);
  }

  createToken(user: User) {
    const token = this.jwtService.sign(
      {
        name: user.name,
        email: user.email,
      },
      {
        expiresIn: '7 days',
        subject: String(user.id),
        issuer: this.ISSUER,
        audience: this.AUDIENCE,
      },
    );

    return { token };
  }

  checkToken(token: string) {
    const tokenData = this.jwtService.verify(token, {
      issuer: this.ISSUER,
      audience: this.AUDIENCE,
    });

    return tokenData;
  }
}
