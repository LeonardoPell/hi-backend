import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateReuniaoDto } from './dto/create-reuniao.dto';
import { UpdateReuniaoDto } from './dto/update-reuniao.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Reuniao } from './entities/reuniao.entity';
import { RetornoApi } from 'src/global/interface/retornoApi.model';
import { createdReturn } from 'src/global/functions/created.model';
import { errorTryCatchReturn } from 'src/global/functions/error-try-catch.model';
import { foundReturn } from 'src/global/functions/found.model';
import { notFoundReturn } from 'src/global/functions/not-found.model';
import { updatedReturn } from 'src/global/functions/updated.model';
import { PresencaReuniaoService } from '../presenca-reuniao/presenca-reuniao.service';
import { Op } from 'sequelize';
import * as moment from 'moment';
import { UsuarioService } from '../usuario/usuario.service';
import { CreateUsuarioDto } from '../usuario/dto/create-usuario.dto';
import { PresencaReuniao } from '../presenca-reuniao/entities/presenca-reuniao.entity';
import { internalServerErrorReturn } from 'src/global/functions/server-error.model';

@Injectable()
export class ReunioesService {
  constructor(
    @InjectModel(Reuniao)
    private readonly reuniaoEntity: typeof Reuniao,
    private readonly _presencaReuniaoService: PresencaReuniaoService,
    private readonly _usuarioService: UsuarioService,
  ) {}

  async create(createReuniaoDto: CreateReuniaoDto): Promise<RetornoApi> {
    createReuniaoDto.reuniao_aconteceu = false;
    try {
      const reuniao = await this.reuniaoEntity.create(createReuniaoDto as any);
      await this._presencaReuniaoService.create({
        id_reuniao: reuniao.id,
        usuarios_presentes: [],
      });

      return createdReturn('Reunião cadastrada com sucesso!', reuniao);
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }

  async findAll(): Promise<RetornoApi> {
    try {
      const reunioes = await this.reuniaoEntity.findAll();

      if (!reunioes.length) {
        return notFoundReturn(`Nenhuma reunião foi encontrada no sistema!`);
      }

      return foundReturn('Reuniões encontradas com suecesso!', reunioes);
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }

  async findOne(id: number) {
    try {
      const reuniao = await this.reuniaoEntity.findByPk(id);

      if (!reuniao) {
        return notFoundReturn(`Nenhuma reunião foi encontrada no sistema!`);
      }

      return foundReturn(`Reunião ${id} encontrada com suecesso!`, reuniao);
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }

  async update(id: number, updateReuniaoDto: UpdateReuniaoDto) {
    const evento = await this.findOne(id);
    if (evento.status !== HttpStatus.OK) {
      return evento;
    }

    try {
      evento.dados.set(updateReuniaoDto);
      await evento.dados.save();

      return updatedReturn(
        `Evento de id #${id} editado com sucesso`,
        evento.dados,
      );
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} reunioe`;
  }

  async relatorioPresencaDados(anoDesejado: string): Promise<RetornoApi> {
    const data = moment(anoDesejado);
    const ano = data.format('YYYY');
    const primeiroDiaDoAno = moment(`${ano}-01-01`).format();
    const ultimoDiaDoAno = moment(`${ano}-12-31`).format();
    try {
      const reunioes = await this.reuniaoEntity.findAll({
        where: {
          data_hora_reuniao: {
            [Op.between]: [primeiroDiaDoAno, ultimoDiaDoAno],
          },
          reuniao_aconteceu: true,
        },
      });

      if (!reunioes.length) {
        return notFoundReturn(
          `Nenhuma reunião CONFIRMADA foi encontrada no sistema!`,
        );
      }

      const idReunioes = [];

      reunioes.map((reuniao) => {
        idReunioes.push(reuniao.id);
      });

      const presencas =
        await this._presencaReuniaoService.retornaListadePresencaPorIdReuniao(
          idReunioes,
        );

      if (presencas.status !== HttpStatus.OK) {
        return presencas;
      }

      const usuarios = await this._usuarioService.findAll();

      if (usuarios.status !== HttpStatus.OK) {
        return usuarios;
      }

      const porcentagemPresenca = this.calcularPorcentagemPresenca(
        usuarios.dados,
        reunioes,
        presencas.dados,
      );

      if (!porcentagemPresenca || !porcentagemPresenca.length) {
        return internalServerErrorReturn(null, `gerar dados de porcentagem`);
      }

      const dadosRelatorio = {
        qtdReunioesTotal: presencas.dados.length,
        dadosUsuarios: porcentagemPresenca,
      };

      return foundReturn(`Dados gerados com sucesso!`, dadosRelatorio);
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }

  private calcularPorcentagemPresenca(
    usuarios: CreateUsuarioDto[],
    reunioes: Reuniao[],
    presencas: PresencaReuniao[],
  ): { id: number; porcentagem: number; quantidadeReunioes: number }[] {
    const totalReunioes = reunioes.length;
    const presencasPorUsuario = new Map<number, number>();
    const reunioesPorUsuario = new Map<number, number>();

    for (const usuario of usuarios) {
      presencasPorUsuario.set(usuario.id, 0);
      reunioesPorUsuario.set(usuario.id, 0);
    }

    for (const presenca of presencas) {
      for (const usuarioId of presenca.usuarios_presentes) {
        if (presencasPorUsuario.has(usuarioId)) {
          presencasPorUsuario.set(
            usuarioId,
            presencasPorUsuario.get(usuarioId) + 1,
          );
          reunioesPorUsuario.set(
            usuarioId,
            reunioesPorUsuario.get(usuarioId) + 1,
          );
        }
      }
    }

    const presencasUsuarios = usuarios.map((usuario) => {
      const presencas = presencasPorUsuario.get(usuario.id) || 0;
      const porcentagem = (presencas / totalReunioes) * 100;
      const quantidadeReunioes = reunioesPorUsuario.get(usuario.id) || 0;

      return {
        id: usuario.id,
        nome: usuario.nome,
        cor: porcentagem >= 50 ? 'green' : 'red',
        porcentagem,
        quantidadeReunioes,
      };
    });

    return presencasUsuarios;
  }
}
