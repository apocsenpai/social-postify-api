import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './user.repository';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(data: CreateUserDto) {
    if (await this.userExists(data.email))
      throw new ConflictException('User already exists');

    const hashPassword = bcrypt.hashSync(data.password, 10);

    await this.usersRepository.create({ ...data, password: hashPassword });
  }

  async userExists(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }
}