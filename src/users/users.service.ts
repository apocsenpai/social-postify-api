import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(data: CreateUserDto) {
    if (await this.findUserByEmail(data.email))
      throw new ConflictException('User already exists');

    const createBody = {
      ...data,
      password: this.encryptPassword(data.password),
    };

    const user = new User(createBody);

    await this.usersRepository.create(user);
  }

  async findUserById(id: string): Promise<User | null> {
    return this.usersRepository.findUserById(id);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }

  async update(id: string, data: UpdateUserDto, user: User) {
    if (id !== user.id) throw new ForbiddenException('Not allowed');

    const updateBody = data.password
      ? {
          ...data,
          password: this.encryptPassword(data.password),
        }
      : data;

    return this.usersRepository.update(updateBody, id);
  }

  encryptPassword(password: string) {
    return bcrypt.hashSync(password, 10);
  }
}
