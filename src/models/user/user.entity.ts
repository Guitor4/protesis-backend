import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StandardDateColumns } from '../shared/standardDateColumns';

@Entity()
export class User extends StandardDateColumns {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ select: false })
  login: string;

  @Column({ select: false })
  password: string;
}
