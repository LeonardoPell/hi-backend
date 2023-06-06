import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePresencaReuniaoDto } from './dto/create-presenca-reuniao.dto';
import { UpdatePresencaReuniaoDto } from './dto/update-presenca-reuniao.dto';
import { PresencaReuniao } from './entities/presenca-reuniao.entity';
import { InjectModel } from '@nestjs/sequelize';
import { createdReturn } from 'src/global/functions/created.model';
import { errorTryCatchReturn } from 'src/global/functions/error-try-catch.model';
import { notFoundReturn } from 'src/global/functions/not-found.model';
import { foundReturn } from 'src/global/functions/found.model';
import { updatedReturn } from 'src/global/functions/updated.model';
import * as moment from 'moment';

@Injectable()
export class PresencaReuniaoService {

  constructor(
    @InjectModel(PresencaReuniao)
    private readonly presencaReuniaoEntity: typeof PresencaReuniao,
  ) {}

  async create(createPresencaReuniaoDto: CreatePresencaReuniaoDto) {
    try {
      const presenca = await this.presencaReuniaoEntity.create(createPresencaReuniaoDto as any);

      return createdReturn('Lista de presença cadastrada com sucesso!', presenca);
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }

  async findOne(id_reuniao: number) {
    try {
      const presenca = await this.presencaReuniaoEntity.findOne({
        where: {
          id_reuniao
        }
      });

      if (!presenca) {
        return notFoundReturn(
          `Nenhuma lista de presença com id de reunião: ${id_reuniao} foi encontrada no sistema!`,
        );
      }

      return foundReturn('Lista de presença encontrada com suecesso!', presenca);
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }

  async update(id_reuniao: number, updatePresencaReuniaoDto: UpdatePresencaReuniaoDto) {
    const presenca = await this.findOne(id_reuniao);
    if (presenca.status !== HttpStatus.OK) {
      return presenca;
    }

    try {
      presenca.dados.atualizado_em = moment().format();
      presenca.dados.set(updatePresencaReuniaoDto);
      await presenca.dados.save();

      return updatedReturn(
        `Lista de presença de id da reunião ${id_reuniao} editada com sucesso`,
        presenca.dados,
      );
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }
}
