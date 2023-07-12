import { TypeOrmModule } from '@nestjs/typeorm';

export const DataBaseConnection = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'extelar@2023',
  database: 'protesis',
  entities: ['dist/models/**/*.entity.js'],
  synchronize: true,
  logging: ['query', 'error', 'migration'],
});
