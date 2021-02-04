import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RegisterDto } from './register.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        const user = this.usersService.create(registerDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id/projects')
    getProjects(@Param('id') id) {
      return this.usersService.findProjects(id);
  }
}
