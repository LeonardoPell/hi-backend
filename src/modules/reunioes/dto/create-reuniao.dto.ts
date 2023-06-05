import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateReuniaoDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsString()
  descricao: string;

  @IsOptional()
  @IsString()
  data_hora_reuniao?: string;
}
  
