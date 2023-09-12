import { RetornoApi } from 'src/global/interface/retornoApi.model';
import { CreateAtaReuniaoDto } from './dto/create-ata-reuniao.dto';
import { UpdateAtaReuniaoDto } from './dto/update-ata-reuniao.dto';
import { AtaReuniao } from './entities/ata-reuniao.entity';
import { InjectModel } from '@nestjs/sequelize';
import { errorTryCatchReturn } from 'src/global/functions/error-try-catch.model';
import { createdReturn } from 'src/global/functions/created.model';
import { foundReturn } from 'src/global/functions/found.model';
import { notFoundReturn } from 'src/global/functions/not-found.model';
import { updatedReturn } from 'src/global/functions/updated.model';
import { Reuniao } from '../reunioes/entities/reuniao.entity';

export class AtaReuniaoService {
  constructor(
    @InjectModel(AtaReuniao)
    private readonly ataReuniao: typeof AtaReuniao,
  ) {}

  async create(createAtaReuniaoDto: CreateAtaReuniaoDto): Promise<RetornoApi> {
    try {
      const ataReuniao = await this.ataReuniao.create(
        createAtaReuniaoDto as any,
      );

      return createdReturn('Ata cadastrada com sucesso!', ataReuniao);
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }

  async findOneByMeet(id: number): Promise<RetornoApi> {
    try {
      const ataReuniao = await this.ataReuniao.findOne({
        include: [
          {
            model: Reuniao,
            required: true,
            where: {
              id,
            },
          },
        ],
      });

      if (!ataReuniao) {
        return notFoundReturn(
          `Nenhuma ata foi encontrada, então uma nova será criada!`,
        );
      }

      return foundReturn('Palavra encontrada com suecesso!', ataReuniao);
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }

  async update(
    id: number,
    updateAtaReuniaoDto: UpdateAtaReuniaoDto,
  ): Promise<RetornoApi> {
    try {
      const ataReuniao = await this.ataReuniao.findOne({
        include: [
          {
            model: Reuniao,
            required: true,
            where: {
              id,
            },
          },
        ],
      });

      if (!ataReuniao) {
        return notFoundReturn(
          `Nenhuma reuniao com id: ${id}, foi encontrada no sistema!`,
        );
      }

      ataReuniao.set(updateAtaReuniaoDto as any);
      await ataReuniao.save();

      return updatedReturn(
        `Ata de Reunião com reuniao de id ${id} editada com sucesso!`,
        ataReuniao,
      );
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }
}
