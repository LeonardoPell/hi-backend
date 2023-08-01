import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { FotosService } from './fotos.service';
import { CreatePastaFotosDto, CreateFotosDto } from './dto/create-foto.dto';
import { UpdatePastaFotosDto, UpdateFotosDto } from './dto/update-foto.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('fotos')
export class FotosController {
  constructor(private readonly fotosService: FotosService) {}

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  async create(@Body() createFotoDto: CreateFotosDto) {
    const foto = await this.fotosService.createFotos(createFotoDto);

    if (foto.status !== HttpStatus.CREATED) {
      throw new HttpException(foto, foto.status);
    }

    return foto;
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('pasta')
  async createPasta(@Body() createFotoPastaDto: CreatePastaFotosDto) {
    const pasta = await this.fotosService.createPasta(createFotoPastaDto);

    if (pasta.status !== HttpStatus.CREATED) {
      throw new HttpException(pasta, pasta.status);
    }

    return pasta;
  }

  @Get('todas/:pasta')
  async findAllFotos(@Param('pasta') pasta: string) {
    const fotos = await this.fotosService.findAllFotos(+pasta);

    if (fotos.status !== HttpStatus.OK) {
      throw new HttpException(fotos, fotos.status);
    }

    return fotos;
  }

  @Get('pasta')
  async findAllPastas() {
    const pastas = await this.fotosService.findAllPastas();

    if (pastas.status !== HttpStatus.OK) {
      throw new HttpException(pastas, pastas.status);
    }

    return pastas;
  }

  @Get(':id')
  async findOneFoto(@Param('id') id: string) {
    const fotos = await this.fotosService.findOneFoto(+id);

    if (fotos.status !== HttpStatus.OK) {
      throw new HttpException(fotos, fotos.status);
    }

    return fotos;
  }

  @Get('pasta/:id')
  async findOnePasta(@Param('id') id: string) {
    const pasta = await this.fotosService.findOnePasta(+id);

    if (pasta.status !== HttpStatus.OK) {
      throw new HttpException(pasta, pasta.status);
    }

    return pasta;
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Patch(':id')
  async updateFoto(
    @Param('id') id: string,
    @Body() updateFotoDto: UpdateFotosDto,
  ) {
    const foto = await this.fotosService.updateFoto(+id, updateFotoDto);

    if (foto.status !== HttpStatus.OK) {
      throw new HttpException(foto, foto.status);
    }

    return foto;
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Patch('pasta/:id')
  async updatePasta(
    @Param('id') id: string,
    @Body() updateFotoPastaDto: UpdatePastaFotosDto,
  ) {
    const pasta = await this.fotosService.updatePasta(+id, updateFotoPastaDto);

    if (pasta.status !== HttpStatus.OK) {
      throw new HttpException(pasta, pasta.status);
    }

    return pasta;
  }
}
