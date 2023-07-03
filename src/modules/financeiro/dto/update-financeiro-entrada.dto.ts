import { PartialType } from '@nestjs/mapped-types';
import { CreateFinanceiroEntradaDto } from './create-financeiro-entrada.dto';

export class UpdateFinanceiroEntradaDto extends PartialType(
  CreateFinanceiroEntradaDto,
) {}
