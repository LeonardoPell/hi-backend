import { PartialType } from '@nestjs/mapped-types';
import {
  CreateFinanceiroEntradaDto,
  CreateFinanceiroSaidaDto,
} from './create-financeiro-entrada.dto';

export class UpdateFinanceiroEntradaDto extends PartialType(
  CreateFinanceiroEntradaDto,
) {}

export class UpdateFinanceiroSaidaDto extends PartialType(
  CreateFinanceiroSaidaDto,
) {}
