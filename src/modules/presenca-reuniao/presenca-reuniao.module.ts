import { Module } from '@nestjs/common';
import { PresencaReuniaoService } from './presenca-reuniao.service';
import { PresencaReuniaoController } from './presenca-reuniao.controller';
import { PresencaReuniao } from './entities/presenca-reuniao.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([PresencaReuniao])],
  controllers: [PresencaReuniaoController],
  providers: [PresencaReuniaoService],
  exports: [PresencaReuniaoService],
})
export class PresencaReuniaoModule {}
