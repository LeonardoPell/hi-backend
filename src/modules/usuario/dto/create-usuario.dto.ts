import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  IsNumber,
  IsBoolean,
} from 'class-validator';
export class CreateUsuarioDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  cim: string;

  @IsNotEmpty()
  @IsString()
  telefone: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsNotEmpty()
  @IsString()
  rg: string;

  @IsNotEmpty()
  @IsString()
  senha: string;

  @IsNotEmpty()
  @IsString()
  nascimento: string;

  @IsNotEmpty()
  @IsString()
  iniciacao: string;

  @IsNotEmpty()
  @IsBoolean()
  ativo: string;

  @IsOptional()
  @IsNumber()
  nivel_obreiro: number;

  @IsOptional()
  @IsString()
  elevacao?: string;

  @IsOptional()
  @IsString()
  exaltacao?: string;

  @IsOptional()
  @IsString()
  ime?: string;

  @IsOptional()
  @IsString()
  grau?: string;

  @IsOptional()
  @IsString()
  endereco_comercial?: string;

  @IsOptional()
  @IsString()
  telefone_comercial?: string;

  @IsOptional()
  @IsString()
  endereco_residencial?: string;

  @IsOptional()
  @IsString()
  telefone_residencial?: string;

  @IsOptional()
  @IsString()
  nome_pai?: string;

  @IsOptional()
  @IsString()
  nome_mae?: string;

  @IsOptional()
  @IsString()
  nome_esposa?: string;

  @IsOptional()
  @IsString({ each: true })
  filhos?: string[];
}
