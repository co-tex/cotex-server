import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterDto } from './register.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        const user = this.usersService.create(registerDto);
    }

    @Get('')
    index() {
      return this.usersService.findAll();
  }
}
