import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { OrientacaoRitualisticaService } from './orientacao-ritualistica.service';
import { CreateOrientacaoRitualisticaDto } from './dto/create-orientacao-ritualistica.dto';
import { UpdateOrientacaoRitualisticaDto } from './dto/update-orientacao-ritualistica.dto';

@Controller('orientacao-ritualistica')
export class OrientacaoRitualisticaController {
  constructor(private readonly orientacaoRitualisticaService: OrientacaoRitualisticaService) {}

  @Post()
  async create(@Body() createOrientacaoRitualisticaDto: CreateOrientacaoRitualisticaDto) {
    const orientacaoRitualistica = await this.orientacaoRitualisticaService.create(createOrientacaoRitualisticaDto);

    if (orientacaoRitualistica.status !== HttpStatus.CREATED) {
      throw new HttpException(orientacaoRitualistica, orientacaoRitualistica.status);
    }

    return orientacaoRitualistica;
  }

  @Get()
  async findAll() {
    const orientacoesRitualisticas = await this.orientacaoRitualisticaService.findAll();

    if (orientacoesRitualisticas.status !== HttpStatus.OK) {
      throw new HttpException(orientacoesRitualisticas, orientacoesRitualisticas.status);
    }

    return orientacoesRitualisticas;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const orientacaoRitualistica = await this.orientacaoRitualisticaService.findOne(+id);

    if (orientacaoRitualistica.status !== HttpStatus.OK) {
      throw new HttpException(orientacaoRitualistica, orientacaoRitualistica.status);
    }

    return orientacaoRitualistica;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOrientacaoRitualisticaDto: UpdateOrientacaoRitualisticaDto) {
    const orientacaoRitualistica = await this.orientacaoRitualisticaService.update(+id, updateOrientacaoRitualisticaDto);

    if (orientacaoRitualistica.status !== HttpStatus.OK) {
      throw new HttpException(orientacaoRitualistica, orientacaoRitualistica.status);
    }

    return orientacaoRitualistica;
  }
}
