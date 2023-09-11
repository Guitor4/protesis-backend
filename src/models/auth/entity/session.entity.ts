import { User } from 'src/models/user/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserSession {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.id, { nullable: true })
  @JoinColumn({ name: 'user' })
  user: User;

  @Column()
  token: string;
}
