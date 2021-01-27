import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsEmail, Length, Min, Validator } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    transformer: {
      to: (value: string) => { return value.toLowerCase() },
      from: (value: string) => { return value }
    }
  })
  @IsEmail()
  email: string;
  
  @Column({
    transformer: {
      to: (value: string) => { return bcrypt.hashSync(value, 10) },
      from: (value: string) => { return value }
    }
  })
  @Length(6)
  password: string;

  @Column()
  full_name: string;
  
  @Column({
    default: false
  })
  admin: boolean;
}