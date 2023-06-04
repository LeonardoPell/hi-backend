import { PartialType } from '@nestjs/mapped-types';
import { CreateNivelObreiroDto } from './create-nivel-obreiro.dto';

export class UpdateNivelObreiroDto extends PartialType(CreateNivelObreiroDto) {}
