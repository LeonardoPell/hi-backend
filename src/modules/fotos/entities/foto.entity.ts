import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

@Table({ tableName: 'hi_pasta_fotos' })
export class PastaFotos extends Model<PastaFotos> {
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
  nome_pasta: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  ativo: boolean;
}

@Table({ tableName: 'hi_fotos_pasta' })
export class Fotos extends Model<Fotos> {
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
  descricao_foto: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  url_arquivo: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => PastaFotos)
  pasta: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  ativo: boolean;

  @BelongsTo(() => PastaFotos, 'pasta')
  pastaModel: PastaFotos;
}
