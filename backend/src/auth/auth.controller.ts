import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { ISignInResponse, ISignInBody, ISignUpBody } from 'src/auth/auth.dto';
import { UsersService } from 'src/users/users.service';
import { isEmail } from 'src/validators/isEmail';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { IUserResponse } from 'src/users/users.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @ApiBody({
    type: ISignInBody,
  })
  @ApiOkResponse({ status: 200, type: ISignInResponse })
  @ApiBadRequestResponse({ status: 400, description: 'Validation error' })
  @Post('signin')
  async signIn(@Body() body: ISignInBody): Promise<ISignInResponse> {
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Provided credentials are incorrect');
    }

    const { id } = user;
    const accessToken = await this.authService.signIn(id, email, user.role);

    return {
      accessToken,
    };
  }

  @ApiBody({
    type: ISignUpBody,
  })
  @ApiOkResponse({ status: 200, type: ISignInResponse })
  @ApiBadRequestResponse({ status: 400, description: 'Validation error' })
  @Post('signup')
  async signUp(@Body() body: ISignUpBody): Promise<ISignInResponse> {
    const { email, password, name, role } = body;

    if (!isEmail(email)) {
      throw new BadRequestException('Given email in invalid');
    }

    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      throw new BadRequestException('User already exists');
    }

    if (name.length < 3) {
      throw new BadRequestException('Username too small');
    }

    if (password.length < 8) {
      throw new BadRequestException('Password too small');
    }

    const newUser = await this.usersService.create({
      email,
      name,
      password,
      role,
    });

    const accessToken = await this.authService.signIn(newUser.id, email, role);

    return {
      accessToken,
    };
  }

  @ApiOkResponse({ status: 200, type: IUserResponse })
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Request() req): Promise<IUserResponse> {
    return { ...req.user, password: undefined };
  }
}
