import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { FinanceiroService } from './financeiro.service';
import { CreateFinanceiroEntradaDto } from './dto/create-financeiro-entrada.dto';
import { UpdateFinanceiroEntradaDto } from './dto/update-financeiro-entrada.dto';

@Controller('financeiro')
export class FinanceiroController {
  constructor(private readonly financeiroService: FinanceiroService) {}

  @Post('entrada')
  async createEntrada(
    @Body() createFinanceiroEntradaDto: CreateFinanceiroEntradaDto,
  ) {
    const entrada = await this.financeiroService.createEntrada(
      createFinanceiroEntradaDto,
    );

    if (entrada.status !== HttpStatus.CREATED) {
      throw new HttpException(entrada, entrada.status);
    }

    return entrada;
  }

  @Get('entrada/mes/:mes/ano/:ano')
  async findByMonthEntrada(
    @Param('mes') mes: string,
    @Param('ano') ano: string,
  ) {
    const entradas = await this.financeiroService.findByMonthEntrada(
      +mes,
      +ano,
    );

    if (entradas.status !== HttpStatus.OK) {
      throw new HttpException(entradas, entradas.status);
    }

    return entradas;
  }

  @Get('entrada/ano/:ano')
  async findByYearEntrada(@Param('ano') ano: string) {
    const entradas = await this.financeiroService.findByYearEntrada(+ano);

    if (entradas.status !== HttpStatus.OK) {
      throw new HttpException(entradas, entradas.status);
    }

    return entradas;
  }

  @Get('entrada/:id')
  async findOneEntrada(@Param('id') id: string) {
    const entradas = await this.financeiroService.findOneEntrada(+id);

    if (entradas.status !== HttpStatus.OK) {
      throw new HttpException(entradas, entradas.status);
    }

    return entradas;
  }

  @Patch('entrada/:id')
  async updateEntrada(
    @Param('id') id: string,
    @Body() updateFinanceiroEntradaDto: UpdateFinanceiroEntradaDto,
  ) {
    const entrada = await this.financeiroService.updateEntrada(
      +id,
      updateFinanceiroEntradaDto,
    );

    if (entrada.status !== HttpStatus.OK) {
      throw new HttpException(entrada, entrada.status);
    }

    return entrada;
  }
}
