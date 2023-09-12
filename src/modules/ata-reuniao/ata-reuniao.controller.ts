import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AtaReuniaoService } from './ata-reuniao.service';
import { CreateAtaReuniaoDto } from './dto/create-ata-reuniao.dto';
import { UpdateAtaReuniaoDto } from './dto/update-ata-reuniao.dto';

@Controller('ata-reuniao')
export class AtaReuniaoController {
  constructor(private readonly ataReuniaoService: AtaReuniaoService) {}

  @Post()
  async create(@Body() createAtaReuniaoDto: CreateAtaReuniaoDto) {
    const ataReuniao = await this.ataReuniaoService.create(createAtaReuniaoDto);

    if (ataReuniao.status !== HttpStatus.CREATED) {
      throw new HttpException(ataReuniao, ataReuniao.status);
    }

    return ataReuniao;
  }

  @Get('reuniao/:id')
  async findOneByMeet(@Param('id') id: string) {
    const ataReuniao = await this.ataReuniaoService.findOneByMeet(+id);

    if (ataReuniao.status !== HttpStatus.OK) {
      throw new HttpException(ataReuniao, ataReuniao.status);
    }

    return ataReuniao;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAtaReuniaoDto: UpdateAtaReuniaoDto,
  ) {
    const ataReuniao = await this.ataReuniaoService.update(
      +id,
      updateAtaReuniaoDto,
    );

    if (ataReuniao.status !== HttpStatus.OK) {
      throw new HttpException(ataReuniao, ataReuniao.status);
    }

    return ataReuniao;
  }
}
