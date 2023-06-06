import { Module } from '@nestjs/common';
import { ReunioesService } from './reunioes.service';
import { ReunioesController } from './reunioes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reuniao } from './entities/reuniao.entity';
import { PresencaReuniaoModule } from '../presenca-reuniao/presenca-reuniao.module';

@Module({
  imports: [SequelizeModule.forFeature([Reuniao]),PresencaReuniaoModule],
  controllers: [ReunioesController],
  providers: [ReunioesService],
  exports: [ReunioesService],
})
export class ReunioesModule {}
