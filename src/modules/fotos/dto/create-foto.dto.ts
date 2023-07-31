import {
  IsNotEmpty,
  IsBoolean,
  IsString,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreatePastaFotosDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  @IsString()
  nome_pasta: string;

  @IsBoolean()
  ativo: boolean;
}

export class CreateFotosDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  @IsString()
  descricao_foto: string;

  @IsNotEmpty()
  @IsString()
  url_arquivo: string;

  @IsNotEmpty()
  @IsNumber()
  pasta: number;

  @IsBoolean()
  ativo: boolean;
}
