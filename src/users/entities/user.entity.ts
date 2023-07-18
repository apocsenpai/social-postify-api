import { randomUUID } from 'crypto';
import { CreateUserDto } from '../dto/create-user.dto';

export class User {
  readonly id: string = randomUUID();
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly avatar: string;
  readonly createdAt: Date = new Date();

  constructor({ name, email, password, avatar }: CreateUserDto) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.avatar = avatar;
  }
}
