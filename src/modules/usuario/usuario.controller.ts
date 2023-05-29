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
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    const usuario = await this.usuarioService.create(createUsuarioDto);

    if (usuario.status !== HttpStatus.CREATED) {
      throw new HttpException(usuario, usuario.status);
    }

    return usuario;
  }

  @Get()
  async findAll() {
    const usuarios = await this.usuarioService.findAll();

    if (usuarios.status !== HttpStatus.OK) {
      throw new HttpException(usuarios, usuarios.status);
    }

    return usuarios;
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const usuario = await this.usuarioService.findById(+id);

    if (usuario.status !== HttpStatus.OK) {
      throw new HttpException(usuario, usuario.status);
    }

    return usuario;
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    const usuario = await this.usuarioService.update(+id, updateUsuarioDto);

    if (usuario.status !== HttpStatus.OK) {
      throw new HttpException(usuario, usuario.status);
    }

    return usuario;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const usuario = await this.usuarioService.remove(+id);

    if (usuario.status !== HttpStatus.OK) {
      throw new HttpException(usuario, usuario.status);
    }

    return usuario;
  }
}
