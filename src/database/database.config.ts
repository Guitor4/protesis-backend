import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv-config';

export const DataBaseConnection = TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/src/models/**/*.entity.ts'],
  synchronize: true,
  autoLoadEntities: true,
  logging: ['query', 'error', 'migration'],
});
