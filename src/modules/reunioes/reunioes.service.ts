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

@Injectable()
export class ReunioesService {
  constructor(
    @InjectModel(Reuniao)
    private readonly reuniaoEntity: typeof Reuniao,
    private readonly _presencaReuniaoService: PresencaReuniaoService
  ) {}

  async create(createReuniaoDto: CreateReuniaoDto): Promise<RetornoApi> {
    try {
      const reuniao = await this.reuniaoEntity.create(createReuniaoDto as any);
      await this._presencaReuniaoService.create({
        id_reuniao: reuniao.id,
        usuarios_presentes: []
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
        return notFoundReturn(
          `Nenhuma reunião foi encontrada no sistema!`,
        );
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
        return notFoundReturn(
          `Nenhuma reunião foi encontrada no sistema!`,
        );
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
}
