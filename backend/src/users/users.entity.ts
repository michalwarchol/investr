import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
