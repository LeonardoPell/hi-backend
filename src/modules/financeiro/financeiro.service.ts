import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateFinanceiroEntradaDto } from './dto/create-financeiro-entrada.dto';
import { UpdateFinanceiroEntradaDto } from './dto/update-financeiro-entrada.dto';
import { FinanceiroEntrada } from './entities/financeiro-entrada.entity';
import { InjectModel } from '@nestjs/sequelize';
import * as moment from 'moment';
import { createdReturn } from 'src/global/functions/created.model';
import { errorTryCatchReturn } from 'src/global/functions/error-try-catch.model';
import { RetornoApi } from 'src/global/interface/retornoApi.model';
import { Op } from 'sequelize';
import { foundReturn } from 'src/global/functions/found.model';
import { notFoundReturn } from 'src/global/functions/not-found.model';
import { updatedReturn } from 'src/global/functions/updated.model';

@Injectable()
export class FinanceiroService {
  constructor(
    @InjectModel(FinanceiroEntrada)
    private readonly financeiroEntradaEntity: typeof FinanceiroEntrada,
  ) {}

  async createEntrada(
    createFinanceiroDto: CreateFinanceiroEntradaDto,
  ): Promise<RetornoApi> {
    if (createFinanceiroDto?.data_pagamento) {
      createFinanceiroDto.data_pagamento = moment(
        createFinanceiroDto?.data_pagamento,
      ).format();
    } else {
      createFinanceiroDto.data_pagamento = null;
    }
    createFinanceiroDto.ano_mes_pagamento = moment(
      createFinanceiroDto.ano_mes_pagamento,
    ).format();
    try {
      const entrada = await this.financeiroEntradaEntity.create(
        createFinanceiroDto as any,
      );

      return createdReturn('Entrada cadastrada com sucesso!', entrada);
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }

  async findByMonthEntrada(mes: number, ano: number): Promise<RetornoApi> {
    const mesEscolhido = moment(`${ano}-${mes.toString().padStart(2, '0')}`);
    const primeiroDiaDoMes = moment(mesEscolhido).startOf('month').format();
    const ultimoDiaDoMes = moment(mesEscolhido).endOf('month').format();
    try {
      const entradas = await this.financeiroEntradaEntity.findAll({
        where: {
          ano_mes_pagamento: {
            [Op.between]: [primeiroDiaDoMes, ultimoDiaDoMes],
          },
          ativo: true,
        },
      });

      if (!entradas.length) {
        return notFoundReturn('Nenhuma entrada foi encontrada no sistema!');
      }

      return foundReturn('Entradas encontradas com suecesso!', entradas);
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }

  async findByYearEntrada(ano: number): Promise<RetornoApi> {
    const primeiroDiaDoAno = moment(`${ano}-01-01`).format();
    const ultimoDiaDoAno = moment(`${ano}-12-31`).format();
    try {
      const entradas = await this.financeiroEntradaEntity.findAll({
        where: {
          ano_mes_pagamento: {
            [Op.between]: [primeiroDiaDoAno, ultimoDiaDoAno],
          },
          ativo: true,
        },
      });

      if (!entradas.length) {
        return notFoundReturn('Nenhuma entrada foi encontrada no sistema!');
      }

      return foundReturn('Entradas encontradas com suecesso!', entradas);
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }

  async findOneEntrada(id: number): Promise<RetornoApi> {
    try {
      const entrada = await this.financeiroEntradaEntity.findOne({
        where: {
          id,
          ativo: true,
        },
      });

      if (!entrada) {
        return notFoundReturn('Nenhuma entrada foi encontrada no sistema!');
      }

      return foundReturn('Entrada encontradas com suecesso!', entrada);
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }

  async updateEntrada(
    id: number,
    updateFinanceiroDto: UpdateFinanceiroEntradaDto,
  ): Promise<RetornoApi> {
    const entrada = await this.findOneEntrada(id);
    if (entrada.status !== HttpStatus.OK) {
      return entrada;
    }

    try {
      entrada.dados.set(updateFinanceiroDto);
      await entrada.dados.save();

      return updatedReturn(
        `Entrada de id #${id} editada com sucesso`,
        entrada.dados,
      );
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }
}
