import { Injectable } from '@nestjs/common';
import { CreateOrientacaoRitualisticaDto } from './dto/create-orientacao-ritualistica.dto';
import { UpdateOrientacaoRitualisticaDto } from './dto/update-orientacao-ritualistica.dto';
import { OrientacaoRitualistica } from './entities/orientacao-ritualistica.entity';
import { InjectModel } from '@nestjs/sequelize';
import { RetornoApi } from 'src/global/interface/retornoApi.model';
import { createdReturn } from 'src/global/functions/created.model';
import { errorTryCatchReturn } from 'src/global/functions/error-try-catch.model';
import { notFoundReturn } from 'src/global/functions/not-found.model';
import { foundReturn } from 'src/global/functions/found.model';
import { updatedReturn } from 'src/global/functions/updated.model';

@Injectable()
export class OrientacaoRitualisticaService {

  constructor(
    @InjectModel(OrientacaoRitualistica)
    private readonly orientacaoRitualistica: typeof OrientacaoRitualistica,
  ){}

  async create(createOrientacaoRitualisticaDto: CreateOrientacaoRitualisticaDto): Promise<RetornoApi> {
    createOrientacaoRitualisticaDto.ativo = true;
    try {
      const orientacaoRitualistica = await this.orientacaoRitualistica.create(createOrientacaoRitualisticaDto as any);

      return createdReturn('Documento cadastrado com sucesso!', orientacaoRitualistica);
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }

  async findAll(): Promise<RetornoApi> {
    try {
      const orientacoesRitualisticas = await this.orientacaoRitualistica.findAll({
        where: {
          ativo: true
        }
      });

      if (!orientacoesRitualisticas.length) {
        return notFoundReturn(
          `Nenhum documento foi encontrado no sistema!`,
        );
      }

      return foundReturn('Documentos encontrados com suecesso!', orientacoesRitualisticas);
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }

  async findOne(id: number): Promise<RetornoApi>  {
    try {
      const orientacaoRitualistica = await this.orientacaoRitualistica.findByPk(id);

      if (!orientacaoRitualistica) {
        return notFoundReturn(
          `Nenhum documento com id ${id} foi encontrado no sistema!`,
        );
      }

      return foundReturn('Documento encontrado com suecesso!', orientacaoRitualistica);
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }

  async update(id: number, updateOrientacaoRitualisticaDto: UpdateOrientacaoRitualisticaDto): Promise<RetornoApi>  {
    try {
      const orientacaoRitualistica = await this.orientacaoRitualistica.findByPk(id);

      if(!orientacaoRitualistica){
        return notFoundReturn(
          `Nenhum documento com id ${id} foi encontrado no sistema!`,
        );
      }
      orientacaoRitualistica.set(updateOrientacaoRitualisticaDto as any);
      await orientacaoRitualistica.save();

      return updatedReturn(
        `Documento de id ${id} editado com sucesso!`,
        orientacaoRitualistica,
      );
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }
}
