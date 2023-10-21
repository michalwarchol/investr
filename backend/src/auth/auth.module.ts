import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'src/users/users.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class AuthModule {}
