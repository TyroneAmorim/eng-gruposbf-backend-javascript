import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';

@Entity({ name: 'moedas' })
export class CurrencyEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  nome: string;

  @Column()
  valor: string | string[];
}
