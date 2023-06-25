import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrientacaoRitualisticaService } from './orientacao-ritualistica.service';
import { CreateOrientacaoRitualisticaDto } from './dto/create-orientacao-ritualistica.dto';
import { UpdateOrientacaoRitualisticaDto } from './dto/update-orientacao-ritualistica.dto';

@Controller('orientacao-ritualistica')
export class OrientacaoRitualisticaController {
  constructor(private readonly orientacaoRitualisticaService: OrientacaoRitualisticaService) {}

  @Post()
  create(@Body() createOrientacaoRitualisticaDto: CreateOrientacaoRitualisticaDto) {
    return this.orientacaoRitualisticaService.create(createOrientacaoRitualisticaDto);
  }

  @Get()
  findAll() {
    return this.orientacaoRitualisticaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orientacaoRitualisticaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrientacaoRitualisticaDto: UpdateOrientacaoRitualisticaDto) {
    return this.orientacaoRitualisticaService.update(+id, updateOrientacaoRitualisticaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orientacaoRitualisticaService.remove(+id);
  }
}
