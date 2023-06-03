import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NivelObreiro } from './entities/nivel-obreiro.entity';
import { RetornoApi } from 'src/global/interface/retornoApi.model';
import { notFoundReturn } from 'src/global/functions/not-found.model';
import { foundReturn } from 'src/global/functions/found.model';
import { errorTryCatchReturn } from 'src/global/functions/error-try-catch.model';

@Injectable()
export class NivelObreiroService {
  constructor(
    @InjectModel(NivelObreiro)
    private readonly nivelObreiroEntity: typeof NivelObreiro,
  ) {}

  async findAll(): Promise<RetornoApi> {
    try {
      const niveisObreiro = await this.nivelObreiroEntity.findAll({
        order: [['descricao', 'asc']],
      });

      if (!niveisObreiro.length) {
        return notFoundReturn(
          'Nenhum nivel de obreiro foi encontrado no sistema!',
        );
      }

      return foundReturn(
        'Niveis de obreiros encontrados com suecesso!',
        niveisObreiro,
      );
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }
}
