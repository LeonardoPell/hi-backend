import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'hi_palavra_semestral' })
export class PalavraSemestral extends Model<PalavraSemestral> {
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
  palavra: string;

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
