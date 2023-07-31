import { Module } from '@nestjs/common';
import { FotosService } from './fotos.service';
import { FotosController } from './fotos.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Fotos, PastaFotos } from './entities/foto.entity';

@Module({
  imports: [SequelizeModule.forFeature([Fotos, PastaFotos])],
  controllers: [FotosController],
  providers: [FotosService],
  exports: [FotosService],
})
export class FotosModule {}
