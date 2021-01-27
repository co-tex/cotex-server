import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
  
  @ApiBody({
    type: LoginDto
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return req.user;
  }
}
