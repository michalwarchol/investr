import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from 'src/constants';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false, unique: true })
  email: string;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  password: string;

  @Column('enum', { enum: ['investor', 'company'], nullable: false })
  role: Role;
}
