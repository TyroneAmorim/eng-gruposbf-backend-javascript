import { CurrencyEntity } from '../../src/Currency/currency.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class PopulateParams1679723172779 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(CurrencyEntity, [
      {
        nome: 'moedaBase',
        valor: 'BRL',
      },
      {
        nome: 'moedasDisponiveis',
        valor: ['USD', 'EUR'],
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(CurrencyEntity, {
      nome: 'moedaBase',
    });

    await queryRunner.manager.delete(CurrencyEntity, {
      nome: 'moedasDisponiveis',
    });
  }
}
