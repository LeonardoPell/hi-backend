import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { PalavraSemestralService } from './palavra_semestral.service';
import { CreatePalavraSemestralDto } from './dto/create-palavra_semestral.dto';
import { UpdatePalavraSemestralDto } from './dto/update-palavra_semestral.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('palavra-semestral')
export class PalavraSemestralController {
  constructor(private readonly palavraSemestralService: PalavraSemestralService) {}

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  async create(@Body() createPalavraSemestralDto: CreatePalavraSemestralDto) {
    const palavraSemestral = await this.palavraSemestralService.create(createPalavraSemestralDto);

    if (palavraSemestral.status !== HttpStatus.CREATED) {
      throw new HttpException(palavraSemestral, palavraSemestral.status);
    }

    return palavraSemestral;
  }

  @Get(':palavra')
  async findByWord(@Param('palavra') palavra: string) {
    const palavraSemestral = await this.palavraSemestralService.findByWord(palavra);

    if (palavraSemestral.status !== HttpStatus.OK) {
      throw new HttpException(palavraSemestral, palavraSemestral.status);
    }

    return palavraSemestral;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePalavraSemestralDto: UpdatePalavraSemestralDto) {
    const palavraSemestral = await this.palavraSemestralService.update(+id, updatePalavraSemestralDto);

    if (palavraSemestral.status !== HttpStatus.OK) {
      throw new HttpException(palavraSemestral, palavraSemestral.status);
    }

    return palavraSemestral;
  }
}
