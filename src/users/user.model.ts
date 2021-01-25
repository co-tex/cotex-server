import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  username: string;
  
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  password: string;

  @Column({ defaultValue: true })
  isActive: boolean;
}