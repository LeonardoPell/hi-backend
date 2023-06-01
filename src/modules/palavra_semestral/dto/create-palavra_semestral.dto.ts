import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreatePalavraSemestralDto {
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  @IsString()
  palavra: string;

  @IsOptional()
  @IsString()
  criado_em?: string;

  @IsOptional()
  @IsString()
  atualizado_em?: string;
}
