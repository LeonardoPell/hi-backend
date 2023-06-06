import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'hi_reunioes' })
export class Reuniao extends Model<Reuniao> {
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
  titulo: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  descricao: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  data_hora_reuniao: Date;
}
