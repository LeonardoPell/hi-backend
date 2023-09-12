import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAtaReuniaoDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsString()
  descricao: string;

  @IsNotEmpty()
  @IsNumber()
  reuniao: number;
}
