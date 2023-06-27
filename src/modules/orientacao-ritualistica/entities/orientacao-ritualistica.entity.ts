import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'hi_orientacoes_ritualisticas' })
export class OrientacaoRitualistica extends Model<OrientacaoRitualistica> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(250),
    allowNull: false,
  })
  descricao_arquivo: string;
  
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  url_arquivo: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  ativo: boolean;
}
