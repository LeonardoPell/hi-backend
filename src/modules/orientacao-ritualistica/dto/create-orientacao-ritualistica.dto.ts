import { IsNotEmpty, IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateOrientacaoRitualisticaDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  @IsString()
  descricao_arquivo: string;

  @IsNotEmpty()
  @IsString()
  url_arquivo: string;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}

