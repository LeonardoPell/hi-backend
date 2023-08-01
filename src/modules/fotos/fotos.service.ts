import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Fotos, PastaFotos } from './entities/foto.entity';
import { CreateFotosDto, CreatePastaFotosDto } from './dto/create-foto.dto';
import { createdReturn } from 'src/global/functions/created.model';
import { errorTryCatchReturn } from 'src/global/functions/error-try-catch.model';
import { RetornoApi } from 'src/global/interface/retornoApi.model';
import { notFoundReturn } from 'src/global/functions/not-found.model';
import { foundReturn } from 'src/global/functions/found.model';
import { UpdateFotosDto, UpdatePastaFotosDto } from './dto/update-foto.dto';
import { updatedReturn } from 'src/global/functions/updated.model';

@Injectable()
export class FotosService {
  constructor(
    @InjectModel(Fotos)
    private readonly fotosEntity: typeof Fotos,
    @InjectModel(PastaFotos)
    private readonly pastaFotosEntity: typeof PastaFotos,
  ) {}

  async createFotos(createFoto: CreateFotosDto): Promise<RetornoApi> {
    try {
      const foto = await this.fotosEntity.create(createFoto as any);

      return createdReturn('Foto cadastrada com sucesso!', foto);
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }

  async createPasta(createFoto: CreatePastaFotosDto): Promise<RetornoApi> {
    try {
      const pasta = await this.pastaFotosEntity.create(createFoto as any);

      return createdReturn('Pasta criada com sucesso!', pasta);
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }

  async findAllFotos(pasta: number): Promise<RetornoApi> {
    try {
      const fotos = await this.fotosEntity.findAll({
        where: {
          ativo: true,
          pasta,
        },
      });

      if (!fotos.length) {
        return notFoundReturn(`Nenhuma foto foi encontrada no sistema!`);
      }

      return foundReturn('fotos encontradas com suecesso!', fotos);
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }

  async findAllPastas(): Promise<RetornoApi> {
    try {
      const pastas = await this.pastaFotosEntity.findAll({
        where: {
          ativo: true,
        },
      });

      if (!pastas.length) {
        return notFoundReturn(`Nenhuma pasta foi encontrada no sistema!`);
      }

      return foundReturn('Pastas encontradas com suecesso!', pastas);
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }

  async findOneFoto(id: number): Promise<RetornoApi> {
    try {
      const foto = await this.fotosEntity.findByPk(id);

      if (!foto) {
        return notFoundReturn(
          `Nenhuma foto '${id}' foi encontrada no sistema!`,
        );
      }

      return foundReturn('Foto encontrada com suecesso!', foto);
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }

  async findOnePasta(id: number): Promise<RetornoApi> {
    try {
      const pasta = await this.pastaFotosEntity.findByPk(id);

      if (!pasta) {
        return notFoundReturn(
          `Nenhuma pasta '${id}' foi encontrada no sistema!`,
        );
      }

      return foundReturn('Pasta encontrada com suecesso!', pasta);
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }

  async updateFoto(
    id: number,
    updateFotoDto: UpdateFotosDto,
  ): Promise<RetornoApi> {
    try {
      const foto = await this.findOneFoto(id);

      if (foto.status !== HttpStatus.OK) {
        return foto;
      }

      const fotoEntity: Fotos = foto.dados;

      fotoEntity.set(updateFotoDto as any);
      await fotoEntity.save();

      return updatedReturn(`Foto de id ${id} editada com sucesso!`, fotoEntity);
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }

  async updatePasta(
    id: number,
    updateFotoDto: UpdatePastaFotosDto,
  ): Promise<RetornoApi> {
    try {
      const pasta = await this.findOnePasta(id);

      if (pasta.status !== HttpStatus.OK) {
        return pasta;
      }

      const pastaEntity: PastaFotos = pasta.dados;

      pastaEntity.set(updateFotoDto as any);
      await pastaEntity.save();

      return updatedReturn(
        `Pasta de id ${id} editada com sucesso!`,
        pastaEntity,
      );
    } catch (error) {
      return errorTryCatchReturn(error);
    }
  }
}
