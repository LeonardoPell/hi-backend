import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
} from 'sequelize-typescript';
import { NivelObreiro } from 'src/modules/nivel-obreiro/entities/nivel-obreiro.entity';

@Table({ tableName: 'hi_usuarios' })
export class Usuario extends Model<Usuario> {
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
  nome: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  cim: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  codigo_obreiro: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  telefone: string;

  @Column({
    type: DataType.STRING(11),
    allowNull: false,
  })
  cpf: string;

  @Column({
    type: DataType.STRING(15),
    allowNull: false,
  })
  rg: string;

  @Column({
    type: DataType.STRING(250),
    allowNull: false,
  })
  senha: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  nascimento: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  iniciacao: Date;

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

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  @ForeignKey(() => NivelObreiro)
  nivel_obreiro: number;
}
