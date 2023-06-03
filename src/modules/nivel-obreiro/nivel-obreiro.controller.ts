import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { NivelObreiroService } from './nivel-obreiro.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('nivel-obreiro')
export class NivelObreiroController {
  constructor(private readonly nivelObreiroService: NivelObreiroService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    const niveisObreiro = await this.nivelObreiroService.findAll();

    if (niveisObreiro.status !== HttpStatus.OK) {
      throw new HttpException(niveisObreiro, niveisObreiro.status);
    }

    return niveisObreiro;
  }
}
