import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Reuniao } from 'src/modules/reunioes/entities/reuniao.entity';

@Table({ tableName: 'hi_ata_reuniao' })
export class AtaReuniao extends Model<AtaReuniao> {
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
  titulo: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  descricao: string;

  @ForeignKey(() => Reuniao)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  reuniao: number;

  @BelongsTo(() => Reuniao, 'reuniao')
  reuniaoModel: Reuniao;
}
