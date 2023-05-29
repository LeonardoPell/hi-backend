import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from './entities/usuario.entity';
import * as moment from 'moment';
import { RetornoApi } from 'src/global/interface/retornoApi.model';
import { errorTryCatchReturn } from 'src/global/functions/error-try-catch.model';
import { createdReturn } from 'src/global/functions/created.model';
import { notFoundReturn } from 'src/global/functions/not-found.model';
import { foundReturn } from 'src/global/functions/found.model';
import { updatedReturn } from 'src/global/functions/updated.model';
import { removedReturn } from 'src/global/functions/removed.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario)
    private readonly usuarioEntity: typeof Usuario,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<RetornoApi> {
    createUsuarioDto.nascimento = moment(createUsuarioDto.nascimento).format();
    createUsuarioDto.iniciacao = moment(createUsuarioDto.iniciacao).format();
    createUsuarioDto.senha = await bcrypt.hashSync(createUsuarioDto.senha, 10);
    try {
      const usuario = await this.usuarioEntity.create(createUsuarioDto as any);

      return createdReturn('Usuario cadastrado com sucesso!', usuario);
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }

  async findAll(): Promise<RetornoApi> {
    try {
      const usuarios = await this.usuarioEntity.findAll();

      if (!usuarios.length) {
        return notFoundReturn('Nenhum usuario foi encontrado no sistema!');
      }

      return foundReturn('Usuarios encontrados com suecesso!', usuarios);
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }

  async findById(id: number): Promise<RetornoApi> {
    try {
      const usuario = await this.usuarioEntity.findByPk(id);

      if (!usuario) {
        return notFoundReturn(
          `Nenhum usuario com id: ${id} foi encontrado no sistema!`,
        );
      }

      return foundReturn('Usuario encontrado com suecesso!', usuario);
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }

  async update(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<RetornoApi> {
    const usuario = await this.findById(id);
    if (usuario.status !== HttpStatus.OK) {
      return usuario;
    }

    try {
      usuario.dados.atualizado_em = moment().format();
      usuario.dados.set(updateUsuarioDto);
      await usuario.dados.save();

      return updatedReturn(
        `Usuario de id ${id} editado com sucesso`,
        usuario.dados,
      );
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }

  async remove(id: number): Promise<RetornoApi> {
    try {
      await this.usuarioEntity.destroy({ where: { id } });
      return removedReturn(`Usuario de id ${id} foi deletado com sucesso!`);
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }

  async findByCim(cim: string) {
    try {
      const usuario = await this.usuarioEntity.findOne({
        where: {
          cim,
        },
      });

      return usuario;
    } catch (error) {
      return undefined;
    }
  }
}
