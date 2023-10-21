import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcryptjs';

import { IUserCreateProps } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  async create(props: IUserCreateProps): Promise<User> {
    const passwordHash = bcrypt.hashSync(props.password);

    const user = this.usersRepository.create({
      ...props,
      password: passwordHash,
    });

    this.usersRepository.save(user);
    return user;
  }
}
