import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ReunioesService } from './reunioes.service';
import { CreateReuniaoDto } from './dto/create-reuniao.dto';
import { UpdateReuniaoDto } from './dto/update-reuniao.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('reunioes')
export class ReunioesController {
  constructor(private readonly reunioesService: ReunioesService) {}

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  async create(@Body() createReuniaoDto: CreateReuniaoDto) {
    const reuniao = await this.reunioesService.create(createReuniaoDto);

    if (reuniao.status !== HttpStatus.CREATED) {
      throw new HttpException(reuniao, reuniao.status);
    }

    return reuniao;
  }

  @Get()
  async findAll() {
    const reunioes = await this.reunioesService.findAll();

    if (reunioes.status !== HttpStatus.OK) {
      throw new HttpException(reunioes, reunioes.status);
    }

    return reunioes;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const reuniao = await this.reunioesService.findOne(+id);

    if (reuniao.status !== HttpStatus.OK) {
      throw new HttpException(reuniao, reuniao.status);
    }

    return reuniao;
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReuniaoDto: UpdateReuniaoDto,
  ) {
    const reuniao = await this.reunioesService.update(+id, updateReuniaoDto);

    if (reuniao.status !== HttpStatus.OK) {
      throw new HttpException(reuniao, reuniao.status);
    }

    return reuniao;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reunioesService.remove(+id);
  }

  @Get('relatorio/dados/:anoDesejado')
  async relatorioPresencaDados(@Param('anoDesejado') anoDesejado: string) {
    const dadosReunioes = await this.reunioesService.relatorioPresencaDados(
      anoDesejado,
    );

    if (dadosReunioes.status !== HttpStatus.OK) {
      throw new HttpException(dadosReunioes, dadosReunioes.status);
    }

    return dadosReunioes;
  }
}
