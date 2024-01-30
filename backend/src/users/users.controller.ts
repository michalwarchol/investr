import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { IUserResponse } from './users.dto';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/constants';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOkResponse({ status: 200, type: IUserResponse })
  @Get()
  @Roles(Role.Investor)
  @UseGuards(JwtAuthGuard)
  findAll(): Promise<IUserResponse[]> {
    return this.usersService.findAll();
  }
}
