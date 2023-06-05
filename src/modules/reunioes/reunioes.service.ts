import { Injectable } from '@nestjs/common';
import { CreateReuniaoDto } from './dto/create-reuniao.dto';
import { UpdateReuniaoDto } from './dto/update-reuniao.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Reuniao } from './entities/reuniao.entity';
import { RetornoApi } from 'src/global/interface/retornoApi.model';
import { createdReturn } from 'src/global/functions/created.model';
import { errorTryCatchReturn } from 'src/global/functions/error-try-catch.model';
import { foundReturn } from 'src/global/functions/found.model';
import { notFoundReturn } from 'src/global/functions/not-found.model';

@Injectable()
export class ReunioesService {
  constructor(
    @InjectModel(Reuniao)
    private readonly reuniaoEntity: typeof Reuniao,
  ) {}

  async create(createReuniaoDto: CreateReuniaoDto): Promise<RetornoApi> {
    try {
      const reuniao = await this.reuniaoEntity.create(createReuniaoDto as any);

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

  update(id: number, updateReunioeDto: UpdateReuniaoDto) {
    return `This action updates a #${id} reunioe`;
  }

  remove(id: number) {
    return `This action removes a #${id} reunioe`;
  }
}
