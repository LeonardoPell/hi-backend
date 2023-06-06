import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe, HttpStatus, HttpException } from '@nestjs/common';
import { PresencaReuniaoService } from './presenca-reuniao.service';
import { CreatePresencaReuniaoDto } from './dto/create-presenca-reuniao.dto';
import { UpdatePresencaReuniaoDto } from './dto/update-presenca-reuniao.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('presenca-reuniao')
export class PresencaReuniaoController {
  constructor(private readonly presencaReuniaoService: PresencaReuniaoService) {}

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  async create(@Body() createPresencaReuniaoDto: CreatePresencaReuniaoDto) {
    const presenca = await this.presencaReuniaoService.create(createPresencaReuniaoDto);

    if (presenca.status !== HttpStatus.CREATED) {
      throw new HttpException(presenca, presenca.status);
    }

    return presenca;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':idReuniao')
  async findOne(@Param('idReuniao') idReuniao: string) {
    const presenca = await this.presencaReuniaoService.findOne(+idReuniao);

    if (presenca.status !== HttpStatus.OK) {
      throw new HttpException(presenca, presenca.status);
    }

    return presenca;
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Patch(':idReuniao')
  async update(@Param('idReuniao') idReuniao: string, @Body() updatePresencaReuniaoDto: UpdatePresencaReuniaoDto) {
    const presenca = await this.presencaReuniaoService.update(+idReuniao, updatePresencaReuniaoDto);

    if (presenca.status !== HttpStatus.OK) {
      throw new HttpException(presenca, presenca.status);
    }

    return presenca;
  }

}
