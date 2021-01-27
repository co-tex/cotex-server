import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './register.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}
  
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email: email });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  create(registerDto: RegisterDto) {
    this.usersRepository.save(registerDto);
  }
}