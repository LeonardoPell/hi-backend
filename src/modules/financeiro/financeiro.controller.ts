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
import {
  CreateFinanceiroEntradaDto,
  CreateFinanceiroSaidaDto,
} from './dto/create-financeiro-entrada.dto';
import {
  UpdateFinanceiroEntradaDto,
  UpdateFinanceiroSaidaDto,
} from './dto/update-financeiro-entrada.dto';

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

  @Post('saida')
  async createSaida(
    @Body() createFinanceiroSaidaDto: CreateFinanceiroSaidaDto,
  ) {
    const saida = await this.financeiroService.createSaida(
      createFinanceiroSaidaDto,
    );

    if (saida.status !== HttpStatus.CREATED) {
      throw new HttpException(saida, saida.status);
    }

    return saida;
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

  @Get('saida/mes/:mes/ano/:ano')
  async findByMonthSaida(@Param('mes') mes: string, @Param('ano') ano: string) {
    const saidas = await this.financeiroService.findByMonthSaida(+mes, +ano);

    if (saidas.status !== HttpStatus.OK) {
      throw new HttpException(saidas, saidas.status);
    }

    return saidas;
  }

  @Get('entrada/relacao/ano/:ano')
  async relacaoEntradaSaida(@Param('ano') ano: string) {
    const relacao = await this.financeiroService.relacaoEntradaSaida(+ano);

    if (relacao.status !== HttpStatus.OK) {
      throw new HttpException(relacao, relacao.status);
    }

    return relacao;
  }

  @Get('entrada/ano/:ano')
  async findByYearEntrada(@Param('ano') ano: string) {
    const entradas = await this.financeiroService.findByYearEntrada(+ano);

    if (entradas.status !== HttpStatus.OK) {
      throw new HttpException(entradas, entradas.status);
    }

    return entradas;
  }

  @Get('saida/ano/:ano')
  async findByYearSaida(@Param('ano') ano: string) {
    const saida = await this.financeiroService.findByYearSaida(+ano);

    if (saida.status !== HttpStatus.OK) {
      throw new HttpException(saida, saida.status);
    }

    return saida;
  }

  @Get('entrada/:id')
  async findOneEntrada(@Param('id') id: string) {
    const entradas = await this.financeiroService.findOneEntrada(+id);

    if (entradas.status !== HttpStatus.OK) {
      throw new HttpException(entradas, entradas.status);
    }

    return entradas;
  }

  @Get('saida/:id')
  async findOneSaida(@Param('id') id: string) {
    const saida = await this.financeiroService.findOneSaida(+id);

    if (saida.status !== HttpStatus.OK) {
      throw new HttpException(saida, saida.status);
    }

    return saida;
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

  @Patch('entrada/:id')
  async updateSaida(
    @Param('id') id: string,
    @Body() updateFinanceiroSaidaDto: UpdateFinanceiroSaidaDto,
  ) {
    const saida = await this.financeiroService.updateSaida(
      +id,
      updateFinanceiroSaidaDto,
    );

    if (saida.status !== HttpStatus.OK) {
      throw new HttpException(saida, saida.status);
    }

    return saida;
  }
}
