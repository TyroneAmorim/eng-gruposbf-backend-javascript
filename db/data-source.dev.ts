import { DataSource } from 'typeorm';
import { CurrencyEntity } from '../src/Currency/currency.entity';

export const dataSource = new DataSource({
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  username: 'usuario',
  password: 'usuario',
  database: 'parametros',
  entities: [CurrencyEntity],
  migrations: ['db/migrations/*.ts'],
  synchronize: false,
  useUnifiedTopology: true,
});

dataSource.initialize();
