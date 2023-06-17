import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
} from 'sequelize-typescript';
import { Reuniao } from 'src/modules/reunioes/entities/reuniao.entity';

@Table({ tableName: 'hi_presenca_reuniao' })
export class PresencaReuniao extends Model<PresencaReuniao> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Reuniao)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_reuniao: number;

  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
    allowNull: false,
  })
  usuarios_presentes: number[];

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
