import { PartialType } from '@nestjs/mapped-types';
import { CreatePalavraSemestralDto } from './create-palavra_semestral.dto';

export class UpdatePalavraSemestralDto extends PartialType(CreatePalavraSemestralDto) {}
