import { PartialType } from '@nestjs/mapped-types';
import { CreatePastaFotosDto, CreateFotosDto } from './create-foto.dto';

export class UpdatePastaFotosDto extends PartialType(CreatePastaFotosDto) {}
export class UpdateFotosDto extends PartialType(CreateFotosDto) {}
