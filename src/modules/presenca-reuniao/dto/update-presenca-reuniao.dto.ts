import { PartialType } from '@nestjs/mapped-types';
import { CreatePresencaReuniaoDto } from './create-presenca-reuniao.dto';

export class UpdatePresencaReuniaoDto extends PartialType(CreatePresencaReuniaoDto) {}
