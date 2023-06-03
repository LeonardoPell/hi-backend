import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'hi_nivel_obreiro' })
export class NivelObreiro extends Model<NivelObreiro> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  descricao: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  criado_em: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  atualizado_em: Date;
}
