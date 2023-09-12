import { Module } from '@nestjs/common';
import { AtaReuniaoService } from './ata-reuniao.service';
import { AtaReuniaoController } from './ata-reuniao.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AtaReuniao } from './entities/ata-reuniao.entity';

@Module({
  imports: [SequelizeModule.forFeature([AtaReuniao])],
  controllers: [AtaReuniaoController],
  providers: [AtaReuniaoService],
  exports: [AtaReuniaoService],
})
export class AtaReuniaoModule {}
