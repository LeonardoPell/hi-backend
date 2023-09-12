import { PartialType } from '@nestjs/mapped-types';
import { CreateAtaReuniaoDto } from './create-ata-reuniao.dto';

export class UpdateAtaReuniaoDto extends PartialType(CreateAtaReuniaoDto) {}
