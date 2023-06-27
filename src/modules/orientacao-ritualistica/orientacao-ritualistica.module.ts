import { Module } from '@nestjs/common';
import { OrientacaoRitualisticaService } from './orientacao-ritualistica.service';
import { OrientacaoRitualisticaController } from './orientacao-ritualistica.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrientacaoRitualistica } from './entities/orientacao-ritualistica.entity';

@Module({
  imports: [SequelizeModule.forFeature([OrientacaoRitualistica])],
  controllers: [OrientacaoRitualisticaController],
  providers: [OrientacaoRitualisticaService],
  exports: [OrientacaoRitualisticaService]
})
export class OrientacaoRitualisticaModule {}
