import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsDate,
} from 'class-validator';

export class CreateFinanceiroEntradaDto {
  @IsNotEmpty()
  @IsString()
  descricao: string;

  @IsNotEmpty()
  @IsNumber()
  valor: number;

  @IsNotEmpty()
  @IsNumber()
  tipo: number;

  @IsOptional()
  @IsString()
  data_pagamento?: string;

  @IsNotEmpty()
  @IsString()
  ano_mes_pagamento: string;

  @IsNotEmpty()
  @IsBoolean()
  ativo: boolean;
}
