import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StandardDateColumns } from '../../shared/interfaces/standardDateColumns';
import { UserSession } from '../auth/entity/session.entity';

@Entity()
export class User extends StandardDateColumns {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  username: string;

  @Column({ select: false })
  password: string;

  @OneToOne(() => UserSession, (session) => session.id, { nullable: true })
  @JoinColumn({ name: 'user_session' })
  activeSession: UserSession;
}
