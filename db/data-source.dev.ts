import { DataSource } from 'typeorm';
import { CurrencyEntity } from '../src/Currency/currency.entity';
import { env } from 'process';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.join(__dirname, '../', '.env.development'),
});

export const dataSource = new DataSource({
  type: 'mongodb',
  host: env.MONGO_HOST,
  port: Number(env.MONGO_PORT),
  username: env.MONGO_USER,
  password: env.MONGO_PASSWORD,
  database: env.MONGO_DB,
  entities: [CurrencyEntity],
  migrations: ['db/migrations/*.ts'],
  synchronize: false,
  useUnifiedTopology: true,
});

dataSource.initialize();
