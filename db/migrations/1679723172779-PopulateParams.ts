import { CurrencyEntity } from '../../src/Currency/currency.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class PopulateParams1679723172779 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(CurrencyEntity, [
      {
        nome: 'moedasDisponiveis',
        valor: ['BRL', 'USD', 'EUR', 'INR'],
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(CurrencyEntity, {
      nome: 'moedasDisponiveis',
    });
  }
}
