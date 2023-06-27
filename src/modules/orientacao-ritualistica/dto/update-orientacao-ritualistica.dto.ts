import { PartialType } from '@nestjs/mapped-types';
import { CreateOrientacaoRitualisticaDto } from './create-orientacao-ritualistica.dto';

export class UpdateOrientacaoRitualisticaDto extends PartialType(CreateOrientacaoRitualisticaDto) {}
