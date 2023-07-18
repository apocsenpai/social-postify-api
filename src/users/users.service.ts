import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(data: CreateUserDto) {
    if (await this.findUserByEmail(data.email))
      throw new ConflictException('User already exists');

    const hashPassword = bcrypt.hashSync(data.password, 10);

    const user = new User({ ...data, password: hashPassword });

    await this.usersRepository.create(user);
  }

  async findUserById(id: string): Promise<User | null> {
    return this.usersRepository.findUserById(id);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }
}
