import { Tag } from 'src/tags/tags.entity';
import { User } from 'src/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false })
  name: string;

  @Column('text')
  description: string;

  @Column('numeric', { nullable: false })
  goal: number;

  @Column('varchar')
  image: string;

  @Column('varchar', { nullable: true })
  url: string;

  @Column('varchar')
  contact_email: string;

  @Column('varchar')
  contact_phone: string;

  @ManyToOne(() => User, (user) => user.products)
  owner: User;

  @ManyToMany(() => Tag, (tag) => tag.products)
  @JoinTable()
  tags: Tag[];
}
