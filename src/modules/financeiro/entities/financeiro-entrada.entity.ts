import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'hi_financeiro_entrada',
})
export class FinanceiroEntrada extends Model<FinanceiroEntrada> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  descricao: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  valor: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  tipo: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  data_pagamento: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  ano_mes_pagamento: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  ativo: boolean;
}
