import { Injectable } from '@nestjs/common';
import { CreatePalavraSemestralDto } from './dto/create-palavra_semestral.dto';
import { UpdatePalavraSemestralDto } from './dto/update-palavra_semestral.dto';
import { PalavraSemestral } from './entities/palavra_semestral.entity';
import { InjectModel } from '@nestjs/sequelize';
import { createdReturn } from 'src/global/functions/created.model';
import { errorTryCatchReturn } from 'src/global/functions/error-try-catch.model';
import { notFoundReturn } from 'src/global/functions/not-found.model';
import { foundReturn } from 'src/global/functions/found.model';
import { RetornoApi } from 'src/global/interface/retornoApi.model';
import * as moment from 'moment';
import { updatedReturn } from 'src/global/functions/updated.model';

@Injectable()
export class PalavraSemestralService {

  constructor(
    @InjectModel(PalavraSemestral)
    private readonly palavraSemestral: typeof PalavraSemestral,
  ){}

  async create(createPalavraSemestralDto: CreatePalavraSemestralDto): Promise<RetornoApi> {
    try {
      const palavraSemestral = await this.palavraSemestral.create(createPalavraSemestralDto as any);

      return createdReturn('Palavra Semestral cadastrada com sucesso!', palavraSemestral);
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }

  async findByWord(palavra: string): Promise<RetornoApi> {
    try {
      const palavraSemestral = await this.palavraSemestral.findOne({
        where: {
          palavra
        }
      });

      if (!palavraSemestral) {
        return notFoundReturn(
          `Nenhuma palavra '${palavra}' foi encontrada no sistema!`,
        );
      }

      return foundReturn('Palavra encontrada com suecesso!', palavraSemestral);
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }

  async update(id: number, updatePalavraSemestralDto: UpdatePalavraSemestralDto) {
    try {
      const palavraSemestral = await this.palavraSemestral.findByPk(id);

      if(!palavraSemestral){
        return notFoundReturn(
          `Nenhuma palavra com id: ${id}, foi encontrada no sistema!`,
        );
      }
      updatePalavraSemestralDto.atualizado_em = moment().format();
      palavraSemestral.set(updatePalavraSemestralDto as any);
      await palavraSemestral.save();

      return updatedReturn(
        `Palavra Semestral de id ${id} editada com sucesso!`,
        palavraSemestral,
      );
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }
}
