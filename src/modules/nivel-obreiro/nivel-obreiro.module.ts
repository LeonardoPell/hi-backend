import { Module } from '@nestjs/common';
import { NivelObreiroService } from './nivel-obreiro.service';
import { NivelObreiroController } from './nivel-obreiro.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { NivelObreiro } from './entities/nivel-obreiro.entity';

@Module({
  imports: [SequelizeModule.forFeature([NivelObreiro])],
  controllers: [NivelObreiroController],
  providers: [NivelObreiroService],
  exports: [NivelObreiroService],
})
export class NivelObreiroModule {}
